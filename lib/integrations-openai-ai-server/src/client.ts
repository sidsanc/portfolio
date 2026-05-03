import OpenAI from "openai";

// Supports two modes:
// 1. Replit AI Integrations proxy (when AI_INTEGRATIONS_OPENAI_* vars are set)
// 2. Direct OpenAI API (when OPENAI_API_KEY is set — for external hosting)

const useReplitProxy =
  process.env.AI_INTEGRATIONS_OPENAI_BASE_URL &&
  process.env.AI_INTEGRATIONS_OPENAI_API_KEY;

const useDirectOpenAI = process.env.OPENAI_API_KEY;

if (!useReplitProxy && !useDirectOpenAI) {
  throw new Error(
    "No OpenAI credentials found. Set either:\n" +
    "  • AI_INTEGRATIONS_OPENAI_BASE_URL + AI_INTEGRATIONS_OPENAI_API_KEY (Replit), or\n" +
    "  • OPENAI_API_KEY (direct OpenAI / external hosting)"
  );
}

export const openai = useReplitProxy
  ? new OpenAI({
      apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY!,
      baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL!,
    })
  : new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });

// The model to use — Replit proxy exposes gpt-5.1; direct API uses gpt-4o.
// Override with OPENAI_MODEL env var if needed.
export const CHAT_MODEL =
  process.env.OPENAI_MODEL ??
  (useReplitProxy ? "gpt-5.1" : "gpt-4o");
