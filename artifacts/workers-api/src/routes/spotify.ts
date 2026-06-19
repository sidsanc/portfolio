import { Hono } from "hono";
import type { Bindings } from "../types";

const spotify = new Hono<{ Bindings: Bindings }>();

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";
const TOKEN_KEY = "spotify:token";

interface TokenCache {
  token: string;
  expiresAt: number;
}

interface SpotifyArtist { name: string }
interface SpotifyImage { url: string }
interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  album: { name: string; images: SpotifyImage[] };
  external_urls: { spotify: string };
  duration_ms: number;
}

interface NowPlayingResponse {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string | null;
  songUrl: string;
  playedAt?: string;
  progressMs?: number;
  durationMs?: number;
}

async function getAccessToken(env: Bindings): Promise<string> {
  const now = Date.now();

  const cached = await env.KV.get(TOKEN_KEY);
  if (cached) {
    const parsed = JSON.parse(cached) as TokenCache;
    if (parsed.expiresAt > now + 60_000) return parsed.token;
  }

  const basic = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`);
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }).toString(),
  });

  if (!res.ok) throw new Error(`Spotify token refresh failed: ${res.status}`);

  const data = (await res.json()) as { access_token: string; expires_in: number };
  const cache: TokenCache = { token: data.access_token, expiresAt: now + data.expires_in * 1000 };
  await env.KV.put(TOKEN_KEY, JSON.stringify(cache), {
    expirationTtl: Math.max(60, data.expires_in - 60),
  });
  return cache.token;
}

function formatTrack(
  track: SpotifyTrack,
  isPlaying: boolean,
  extras: { playedAt?: string; progressMs?: number } = {},
): NowPlayingResponse {
  return {
    isPlaying,
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    album: track.album.name,
    albumImageUrl: track.album.images[0]?.url ?? null,
    songUrl: track.external_urls.spotify,
    durationMs: track.duration_ms,
    ...extras,
  };
}

spotify.get("/now-playing", async (c) => {
  try {
    const accessToken = await getAccessToken(c.env);

    const npRes = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (npRes.status === 200) {
      const data = (await npRes.json()) as {
        is_playing: boolean;
        progress_ms: number;
        item: SpotifyTrack | null;
      };
      if (data.item) {
        return c.json(formatTrack(data.item, data.is_playing, { progressMs: data.progress_ms }), 200, {
          "Cache-Control": "public, max-age=30",
        });
      }
    }

    const rpRes = await fetch(RECENTLY_PLAYED_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!rpRes.ok) return c.json({ error: "spotify_unavailable" }, 502);

    const rpData = (await rpRes.json()) as {
      items: Array<{ track: SpotifyTrack; played_at: string }>;
    };
    const recent = rpData.items[0];
    if (!recent) return c.json({ error: "no_recent_tracks" }, 404);

    return c.json(formatTrack(recent.track, false, { playedAt: recent.played_at }), 200, {
      "Cache-Control": "public, max-age=60",
    });
  } catch {
    return c.json({ error: "spotify_error" }, 500);
  }
});

export default spotify;
