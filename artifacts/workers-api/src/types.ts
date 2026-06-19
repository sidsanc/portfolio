export type Bindings = {
  DATABASE_URL: string;
  OPENAI_API_KEY: string;
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REFRESH_TOKEN: string;
  HASHNODE_TOKEN?: string;
  KV: KVNamespace;
  ALLOWED_ORIGIN?: string;
};
