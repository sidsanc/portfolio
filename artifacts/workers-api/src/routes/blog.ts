import { Hono } from "hono";
import type { Bindings } from "../types";

const blog = new Hono<{ Bindings: Bindings }>();

const HASHNODE_GQL = "https://gql.hashnode.com/";
const HASHNODE_HOST = "siddhantsancheti.hashnode.dev";
const CACHE_KEY = "blog:posts";
const CACHE_TTL = 300;

const QUERY = `
  query Posts($host: String!) {
    publication(host: $host) {
      posts(first: 20) {
        edges {
          node {
            title brief slug url publishedAt readTimeInMinutes
            coverImage { url }
            tags { name slug }
          }
        }
      }
    }
  }
`;

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

async function fetchPosts(token?: string): Promise<HashnodePost[]> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": "SiddhantPortfolio/1.0",
  };
  if (token) headers["Authorization"] = token;

  const res = await fetch(HASHNODE_GQL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query: QUERY, variables: { host: HASHNODE_HOST } }),
  });

  const ct = res.headers.get("content-type") ?? "";
  if (!res.ok || !ct.includes("application/json")) {
    throw new Error(`Hashnode returned ${res.status}`);
  }

  const json = (await res.json()) as {
    data?: { publication?: { posts?: { edges?: { node: HashnodePost }[] } } };
    errors?: { message: string }[];
  };

  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  return (json.data?.publication?.posts?.edges ?? []).map((e) => e.node);
}

blog.get("/posts", async (c) => {
  const cached = await c.env.KV.get(CACHE_KEY);
  if (cached) {
    return c.json({ posts: JSON.parse(cached) as HashnodePost[], source: "cache" });
  }

  try {
    const posts = await fetchPosts(c.env.HASHNODE_TOKEN);
    await c.env.KV.put(CACHE_KEY, JSON.stringify(posts), { expirationTtl: CACHE_TTL });
    return c.json({ posts, source: "hashnode" });
  } catch {
    return c.json({
      posts: [],
      source: "fallback",
      note: "Hashnode fetch failed — rendering CTA instead.",
    });
  }
});

export default blog;
