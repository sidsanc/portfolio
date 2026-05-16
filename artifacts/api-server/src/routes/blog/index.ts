import { Router } from "express";

const router = Router();

const HASHNODE_GQL = "https://gql.hashnode.com/";
const HASHNODE_HOST = "siddhantsancheti.hashnode.dev";

type HashnodePost = {
  title: string;
  brief: string;
  slug: string;
  url: string;
  publishedAt: string;
  readTimeInMinutes: number;
  coverImage: { url: string } | null;
  tags: { name: string; slug: string }[];
};

const QUERY = `
  query Posts($host: String!) {
    publication(host: $host) {
      posts(first: 20) {
        edges {
          node {
            title
            brief
            slug
            url
            publishedAt
            readTimeInMinutes
            coverImage { url }
            tags { name slug }
          }
        }
      }
    }
  }
`;

const CACHE_TTL_MS = 5 * 60 * 1000;
let cache: { posts: HashnodePost[]; expiresAt: number } | null = null;

async function fetchPosts(): Promise<HashnodePost[]> {
  const token = process.env["HASHNODE_TOKEN"];
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) headers["Authorization"] = token;

  const res = await fetch(HASHNODE_GQL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query: QUERY, variables: { host: HASHNODE_HOST } }),
  });

  const ct = res.headers.get("content-type") ?? "";
  if (!res.ok || !ct.includes("application/json")) {
    throw new Error(`Hashnode returned ${res.status} ${ct}`);
  }

  const json = (await res.json()) as {
    data?: { publication?: { posts?: { edges?: { node: HashnodePost }[] } } };
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  return (json.data?.publication?.posts?.edges ?? []).map((e) => e.node);
}

router.get("/posts", async (req, res) => {
  const now = Date.now();
  if (cache && cache.expiresAt > now) {
    res.json({ posts: cache.posts, source: "cache" });
    return;
  }

  try {
    const posts = await fetchPosts();
    cache = { posts, expiresAt: now + CACHE_TTL_MS };
    res.json({ posts, source: "hashnode" });
  } catch (err) {
    req.log.warn(
      { err: err instanceof Error ? err.message : String(err) },
      "Hashnode fetch failed; returning empty list",
    );
    // Soft-fail: return empty list with a note so the UI can show a clean CTA
    // instead of a scary error. The public Hashnode GraphQL endpoint is
    // unreliable for unauthenticated requests; set HASHNODE_TOKEN to re-enable.
    res.json({
      posts: [],
      source: "fallback",
      note: "Hashnode public API unavailable. Set HASHNODE_TOKEN secret to enable auto-sync.",
    });
  }
});

export default router;
