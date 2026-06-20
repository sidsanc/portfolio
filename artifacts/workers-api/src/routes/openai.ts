import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { makeDb } from "../lib/db";
import { conversations, messages } from "../lib/schema";
import { checkRateLimit } from "../lib/ratelimit";
import type { Bindings } from "../types";
import { buildSystemPrompt } from "@workspace/portfolio-data";
import type { LiveContext } from "@workspace/portfolio-data";

const openaiRoutes = new Hono<{ Bindings: Bindings }>();

const LIVE_CTX_TTL = 7200;

async function fetchSpotifyContext(env: Bindings): Promise<string | undefined> {
  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`),
      },
      body:
        "grant_type=refresh_token&refresh_token=" +
        encodeURIComponent(env.SPOTIFY_REFRESH_TOKEN),
    });
    const tokenData = (await tokenRes.json()) as { access_token?: string };
    if (!tokenData.access_token) return undefined;

    const cpRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
    );

    if (cpRes.status === 200) {
      const cpData = (await cpRes.json()) as {
        item?: { name: string; artists: { name: string }[] };
      };
      if (cpData?.item) {
        const artist = cpData.item.artists.map((a) => a.name).join(", ");
        return `Currently listening to "${cpData.item.name}" by ${artist} on Spotify.`;
      }
    }

    const rpRes = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
    );
    const rpData = (await rpRes.json()) as {
      items?: { track: { name: string; artists: { name: string }[] } }[];
    };
    const track = rpData?.items?.[0]?.track;
    if (track) {
      const artist = track.artists.map((a) => a.name).join(", ");
      return `Recently listened to "${track.name}" by ${artist} on Spotify.`;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

async function fetchHashnodeContext(): Promise<string | undefined> {
  try {
    const query = `{
      publication(host: "sidsanc.hashnode.dev") {
        posts(first: 3) {
          edges {
            node { title brief url }
          }
        }
      }
    }`;
    const res = await fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = (await res.json()) as {
      data?: {
        publication?: {
          posts?: { edges: { node: { title: string; brief: string; url: string } }[] };
        };
      };
    };
    const edges = data?.data?.publication?.posts?.edges;
    if (!edges?.length) return undefined;
    return edges
      .map((e) => `- "${e.node.title}" — ${e.node.url}`)
      .join("\n");
  } catch {
    return undefined;
  }
}

async function getLiveContext(
  env: Bindings,
  conversationId: number
): Promise<LiveContext> {
  const key = `jarvis:live:${conversationId}`;
  const cached = await env.KV.get(key);
  if (cached) {
    try {
      return JSON.parse(cached) as LiveContext;
    } catch {
      return {};
    }
  }
  return {};
}

openaiRoutes.post("/conversations", async (c) => {
  const ip = c.req.header("CF-Connecting-IP") ?? "unknown";
  const allowed = await checkRateLimit(c.env.KV, ip);
  if (!allowed) {
    return c.json({ error: "Too many requests — please wait a moment." }, 429);
  }

  try {
    const db = makeDb(c.env.DB);
    const [conversation] = await db
      .insert(conversations)
      .values({ title: crypto.randomUUID() })
      .returning();

    const convId = conversation!.id;

    const [spotify, hashnode] = await Promise.allSettled([
      fetchSpotifyContext(c.env),
      fetchHashnodeContext(),
    ]);

    const live: LiveContext = {
      spotify: spotify.status === "fulfilled" ? spotify.value : undefined,
      hashnode: hashnode.status === "fulfilled" ? hashnode.value : undefined,
    };

    await c.env.KV.put(
      `jarvis:live:${convId}`,
      JSON.stringify(live),
      { expirationTtl: LIVE_CTX_TTL }
    );

    return c.json(
      { id: String(convId), createdAt: conversation!.createdAt },
      201
    );
  } catch {
    return c.json({ error: "Failed to create conversation" }, 500);
  }
});

openaiRoutes.get("/conversations/:id/messages", async (c) => {
  const id = parseInt(c.req.param("id"), 10);
  if (isNaN(id)) return c.json({ error: "Invalid conversation id" }, 400);

  try {
    const db = makeDb(c.env.DB);

    const [conv] = await db
      .select({ id: conversations.id })
      .from(conversations)
      .where(eq(conversations.id, id))
      .limit(1);

    if (!conv) return c.json({ error: "Conversation not found" }, 404);

    const msgs = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, id))
      .orderBy(messages.createdAt);

    return c.json(
      msgs.map((m) => ({
        id: m.id,
        conversationId: String(m.conversationId),
        role: m.role,
        content: m.content,
        createdAt: m.createdAt,
      }))
    );
  } catch {
    return c.json({ error: "Failed to get messages" }, 500);
  }
});

openaiRoutes.post("/conversations/:id/messages", async (c) => {
  const ip = c.req.header("CF-Connecting-IP") ?? "unknown";
  const allowed = await checkRateLimit(c.env.KV, ip);
  if (!allowed) {
    return c.json({ error: "Too many requests — please wait a moment." }, 429);
  }

  const conversationId = parseInt(c.req.param("id"), 10);
  if (isNaN(conversationId)) return c.json({ error: "Invalid conversation id" }, 400);

  let body: { content?: string };
  try {
    body = await c.req.json<{ content?: string }>();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const userContent = body.content?.trim();
  if (!userContent) return c.json({ error: "content is required" }, 400);

  const db = makeDb(c.env.DB);

  try {
    await db.insert(messages).values({ conversationId, role: "user", content: userContent });

    const [history, live] = await Promise.all([
      db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, conversationId))
        .orderBy(messages.createdAt),
      getLiveContext(c.env, conversationId),
    ]);

    const systemPrompt = buildSystemPrompt(live);

    const chatMessages = [
      { role: "system" as const, content: systemPrompt },
      ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
    ];

    const aiStream = (await c.env.AI.run(
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      { messages: chatMessages, stream: true }
    )) as ReadableStream;

    const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    (async () => {
      let fullResponse = "";
      try {
        const reader = aiStream.getReader();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const dataStr = trimmed.slice(5).trim();
            if (dataStr === "[DONE]") continue;
            try {
              const parsed = JSON.parse(dataStr) as { response?: string };
              if (parsed.response) {
                fullResponse += parsed.response;
                await writer.write(
                  encoder.encode(`data: ${JSON.stringify({ content: parsed.response })}\n\n`)
                );
              }
            } catch {
              // skip malformed chunks
            }
          }
        }

        await db.insert(messages).values({
          conversationId,
          role: "assistant",
          content: fullResponse,
        });

        await writer.write(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
      } catch {
        await writer.write(
          encoder.encode(`data: ${JSON.stringify({ error: "Stream interrupted" })}\n\n`)
        );
      } finally {
        await writer.close();
      }
    })();

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch {
    return c.json({ error: "Failed to process message" }, 500);
  }
});

export default openaiRoutes;
