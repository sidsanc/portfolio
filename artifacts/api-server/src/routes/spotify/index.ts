import { Router } from "express";

const router = Router();

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedAccessToken && cachedAccessToken.expiresAt > now + 60_000) {
    return cachedAccessToken.token;
  }

  const clientId = process.env["SPOTIFY_CLIENT_ID"];
  const clientSecret = process.env["SPOTIFY_CLIENT_SECRET"];
  const refreshToken = process.env["SPOTIFY_REFRESH_TOKEN"];

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Spotify credentials not configured");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }).toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify token refresh failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedAccessToken = {
    token: data.access_token,
    expiresAt: now + data.expires_in * 1000,
  };
  return data.access_token;
}

interface SpotifyArtist {
  name: string;
}
interface SpotifyImage {
  url: string;
  width?: number;
  height?: number;
}
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

router.get("/now-playing", async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    // Try currently playing first
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
        res.set("Cache-Control", "public, max-age=30, s-maxage=30");
        return res.json(
          formatTrack(data.item, data.is_playing, {
            progressMs: data.progress_ms,
          }),
        );
      }
    }

    // Fallback: most recently played
    const rpRes = await fetch(RECENTLY_PLAYED_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!rpRes.ok) {
      const text = await rpRes.text();
      req.log.error({ status: rpRes.status, text }, "Spotify recently-played failed");
      return res.status(502).json({ error: "spotify_unavailable" });
    }

    const rpData = (await rpRes.json()) as {
      items: Array<{ track: SpotifyTrack; played_at: string }>;
    };
    const recent = rpData.items[0];
    if (!recent) {
      return res.status(404).json({ error: "no_recent_tracks" });
    }

    res.set("Cache-Control", "public, max-age=60, s-maxage=60");
    return res.json(
      formatTrack(recent.track, false, { playedAt: recent.played_at }),
    );
  } catch (err) {
    req.log.error({ err }, "Spotify now-playing error");
    return res.status(500).json({ error: "spotify_error" });
  }
});

export default router;
