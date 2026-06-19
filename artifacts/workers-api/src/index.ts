import { Hono } from "hono";
import { cors } from "hono/cors";
import health from "./routes/health";
import blog from "./routes/blog";
import spotify from "./routes/spotify";
import openai from "./routes/openai";
import type { Bindings } from "./types";

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "*",
  cors({
    origin: (origin, c) => {
      if (!origin) return "*";
      const allowed = c.env.ALLOWED_ORIGIN ?? "https://siddhantsancheti.com";
      if (
        origin === allowed ||
        origin.endsWith(".pages.dev") ||
        origin.startsWith("http://localhost")
      ) {
        return origin;
      }
      return allowed;
    },
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

const api = new Hono<{ Bindings: Bindings }>();

api.route("/healthz", health);
api.route("/blog", blog);
api.route("/spotify", spotify);
api.route("/openai", openai);

app.route("/api", api);

export default app;
