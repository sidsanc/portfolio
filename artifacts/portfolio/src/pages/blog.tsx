import { motion } from "framer-motion";
import { ExternalLink, Rss, PenLine, Clock, Calendar, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

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

const HASHNODE_HOST = "siddhantsancheti.hashnode.dev";
const HASHNODE_PROFILE = "https://hashnode.com/@sidsanc";

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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Blog() {
  const [posts, setPosts] = useState<HashnodePost[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://gql.hashnode.com", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: QUERY, variables: { host: HASHNODE_HOST } }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const edges = json?.data?.publication?.posts?.edges ?? [];
        if (!cancelled) setPosts(edges.map((e: { node: HashnodePost }) => e.node));
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load posts");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = posts?.[0];
  const rest = posts?.slice(1) ?? [];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="page-title gradient-text mb-4">Blog</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Writing about AI systems, cloud infrastructure, distributed systems, and the craft of engineering.
        </p>
      </motion.div>

      {/* Hashnode CTA strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="neo-card p-5 mb-10 flex items-center justify-between flex-wrap gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="neo-inset w-12 h-12 rounded-full flex items-center justify-center shrink-0">
            <PenLine className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="font-semibold">Published on Hashnode</div>
            <div className="text-sm text-muted-foreground">Auto-synced from siddhantsancheti.hashnode.dev</div>
          </div>
        </div>
        <a
          href={HASHNODE_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="neo-btn inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary"
        >
          <Rss className="w-4 h-4" />
          Follow on Hashnode
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </motion.div>

      {/* Loading state */}
      {!posts && !error && (
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="neo-card p-6 animate-pulse">
              <div className="aspect-[16/9] rounded-lg bg-muted/30 mb-4" />
              <div className="h-5 bg-muted/30 rounded w-3/4 mb-3" />
              <div className="h-3 bg-muted/30 rounded w-full mb-2" />
              <div className="h-3 bg-muted/30 rounded w-5/6" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="neo-card p-8 text-center">
          <AlertCircle className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">Couldn't load posts right now.</p>
          <a
            href={HASHNODE_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary"
          >
            Read on Hashnode <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Featured post */}
      {featured && (
        <motion.a
          href={featured.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="neo-card group block mb-8 overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary" />
          <div className="grid md:grid-cols-2 gap-0">
            {featured.coverImage?.url && (
              <div className="aspect-[16/10] md:aspect-auto overflow-hidden bg-muted/20">
                <img
                  src={featured.coverImage.url}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Latest</span>
                <span className="text-muted-foreground">·</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" /> {formatDate(featured.publishedAt)}
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> {featured.readTimeInMinutes} min
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                {featured.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                {featured.brief}
              </p>
              <div className="flex flex-wrap gap-2">
                {featured.tags.slice(0, 4).map((t) => (
                  <span key={t.slug} className="neo-inset px-2.5 py-1 text-[11px] text-muted-foreground rounded-full">
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.a>
      )}

      {/* Rest of posts grid */}
      {rest.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((post, i) => (
            <motion.a
              key={post.slug}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="neo-card group block overflow-hidden"
            >
              {post.coverImage?.url && (
                <div className="aspect-[16/9] overflow-hidden bg-muted/20">
                  <img
                    src={post.coverImage.url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" /> {formatDate(post.publishedAt)}
                  <span>·</span>
                  <Clock className="w-3 h-3" /> {post.readTimeInMinutes} min
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {post.brief}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((t) => (
                    <span key={t.slug} className="neo-inset px-2 py-0.5 text-[10px] text-muted-foreground rounded-full">
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}

      {posts && posts.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          New articles auto-sync from Hashnode — no portfolio redeploy needed.
        </motion.p>
      )}
    </div>
  );
}
