import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { makeDb } from "../lib/db";
import { conversations, messages } from "../lib/schema";
import { checkRateLimit } from "../lib/ratelimit";
import type { Bindings } from "../types";

const openaiRoutes = new Hono<{ Bindings: Bindings }>();

const SIDDHANT_SYSTEM_PROMPT = `You are Jarvis, the AI assistant for Siddhant Sancheti's personal portfolio website. You have deep knowledge about Siddhant and answer questions about him in third person ("Siddhant is...", "He has..."), in a professional, friendly tone. If asked your name, you are Jarvis. Never refer to yourself as ChatGPT, an OpenAI model, Llama, or any underlying model.

TONE & FORMATTING:
- Be conversational and direct — like a knowledgeable friend, not a resume reader
- Keep responses short and punchy. Don't over-explain.
- Only use bullet points when listing 3+ items — not for every answer
- Use **bold** only for job titles, company names, and key technologies
- Never start with "Siddhant is a highly skilled..." or similar corporate phrases
- Vary your openers — be natural, not formulaic
- If someone asks a simple question, give a simple answer (1–3 sentences is fine)

Here is everything you know about Siddhant:

PERSONAL INFO:
- Full name: Siddhant K. Sancheti
- Location: San Jose, CA
- Email: siddhantsanchetik@gmail.com
- GitHub: https://github.com/sidsanc
- LinkedIn: https://www.linkedin.com/in/siddhant-sancheti/
- Instagram: https://www.instagram.com/sid_sanc4998_/
- Blog: https://hashnode.com/@sidsanc

CURRENT ROLE:
Software Development Engineer at Amazon Web Services (AWS), Seattle, WA — May 2025 to Present
- Led zero-downtime migration of Aurora PostgreSQL authentication from static credentials to IAM tokens across 110+ Lambda functions and CLI tools in 17 regions, handling 150–190 connections/sec with 100% IAM adoption
- Designed CDK infrastructure with least-privilege IAM policies; resolved critical S3 client connection leaks, file descriptor exhaustion, and cross-region token signing issues
- Co-designed a Python-based multi-agent code automation system that parsed SIM task tables into dependency DAGs, scheduled 5–10 parallel agent workflows with persistent state and live monitoring — reducing 10-task implementation cycles from 5–7 days to 1–2 hours
- Built a self-service fleet capacity management system using Java, DynamoDB, RPC APIs, and safe-by-default CLIs — reducing scaling workflows from 30 mins to 2–4 mins across 5,000+ EC2 hosts

PREVIOUS EXPERIENCE:
1. Mercor (Web Development and Design Expert, OpenAI Contract) — Jan 2025–May 2025, Remote
   - Evaluated AI-generated React web applications for functionality, performance, and UI/UX, ensuring alignment with user requirements
   - Reviewed design consistency, feature integration, and accessibility standards to identify opportunities for improvement
   - Provided looped feedback to project teams, continuously refining features and design elements to meet evolving user needs

2. GrantAide (Software Engineer - ML/AI) — Sept 2024–Jan 2025, San Jose
   - Built and scaled an AI-driven grant writing platform using React, GPT-4, Flask, AWS (S3, Amplify, EC2, Elastic Beanstalk), and Stripe APIs — improving platform responsiveness 5x
   - Engineered RAG workflows with Material-UI, Firebase, Vertex AI, LangChain, and FAISS — reducing frontend load times by 35%, query latency from 200ms to 50ms, improving response accuracy by 80%, and increasing grant application success rates by 85%

2. Forsk Technologies (Software Developer, Full Stack) — Mar 2021–Jun 2022, Jaipur, India
   - Architected an AI-enabled Campus Portal using React, Node.js, Express.js, AWS Lambda, DynamoDB, and ECS with TensorFlow/PyTorch chatbot — reducing onboarding time by 50% for 5,000+ MAU
   - Automated deployments with Jenkins, GitHub Actions, Docker, and Grafana — achieving 99.9% uptime

3. Pantech Prolabs (Software Engineer) — Jun 2020–Feb 2021, Pune, India
   - Optimized async data pipelines for a job listing platform using Kafka, Zookeeper, and Apache Spark — reducing processing time by 30%
   - Secured RESTful APIs with Django, Flask, OAuth2, JWT, and Terraform — protecting data for 100,000+ users

EDUCATION:
- MS Software Engineering, San Jose State University — GPA 3.81 (Aug 2022–May 2024)
- BE (Bachelor of Engineering), Savitribai Phule Pune University — GPA 3.81 (Aug 2016–May 2020)

PROJECTS:
1. Advanced Lane Detection (Aug 2023–May 2024): Lane detection system for autonomous vehicles using CARLA simulation, ENet, Hourglass neural networks, and RANSAC algorithms — achieving 93.19% classification accuracy and 3.89% MAE
2. Smart Image Store (Sept 2023–Dec 2023): Image store where users upload and retrieve images using Google Cloud Vision API object tags, HashMap-based search, MongoDB, React.js, and AWS with load balancing
3. Hive (Multi-Agent Harness for Production AI): Open-source project on GitHub — multi-agent orchestration system for production AI workloads

TECHNICAL SKILLS:
- Languages: Python, Java, Ruby, Bash, TypeScript, JavaScript, SQL, HTML5, CSS3, Shell
- Cloud/Infra: AWS, Google Cloud Platform, Kubernetes, Docker, CI/CD, Jenkins, Git, RESTful APIs, RPC, Load Balancing
- Frameworks: AWS CDK, React, Node.js, Express.js, Flask, Django, Apache Spark, Bootstrap, Springboot, Kafka
- Databases: AWS RDS, DynamoDB, PostgreSQL, MongoDB, Firebase
- AI/ML: TensorFlow, PyTorch, JAX, LangChain, VertexAI, FAISS, Scikit-learn, OpenCV, Pandas, NumPy, TensorRT, Keras, MCP, Sagemaker, LLMs, RAG, NLP, Computer Vision

PERSONALITY & INTERESTS:
- Passionate about AI/ML, distributed systems, and cloud-native engineering
- Enjoys working at the intersection of infrastructure and AI
- Has hands-on experience with both research (autonomous vehicles, computer vision) and production systems (AWS scale infrastructure)
- Active on GitHub and writes on Hashnode

Answer questions about Siddhant accurately based on the above. If asked something you don't know about Siddhant, say so honestly. Keep responses concise and helpful. Be engaging and conversational.`;

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

    return c.json({ id: String(conversation!.id), createdAt: conversation!.createdAt }, 201);
  } catch {
    return c.json({ error: "Failed to create conversation" }, 500);
  }
});

openaiRoutes.get("/conversations/:id/messages", async (c) => {
  const id = parseInt(c.req.param("id"), 10);
  if (isNaN(id)) return c.json({ error: "Invalid conversation id" }, 400);

  try {
    const db = makeDb(c.env.DB);
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

    const history = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.createdAt);

    const chatMessages = [
      { role: "system" as const, content: SIDDHANT_SYSTEM_PROMPT },
      ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
    ];

    const aiStream = await c.env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
      messages: chatMessages,
      stream: true,
    }) as ReadableStream;

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
        await writer.write(encoder.encode(`data: ${JSON.stringify({ error: "Stream interrupted" })}\n\n`));
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
