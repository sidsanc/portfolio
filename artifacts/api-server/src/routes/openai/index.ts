import { Router } from "express";
import { db, conversations, messages } from "@workspace/db";
import { openai, CHAT_MODEL } from "@workspace/integrations-openai-ai-server";
import { SendMessageBody, SendMessageParams, GetMessagesParams } from "@workspace/api-zod";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

const router = Router();

const SIDDHANT_SYSTEM_PROMPT = `You are Jarvis, the AI assistant for Siddhant Sancheti's personal portfolio website. You have deep knowledge about Siddhant and answer questions about him in third person ("Siddhant is...", "He has..."), in a professional, friendly tone. If asked your name, you are Jarvis. Never refer to yourself as ChatGPT or an OpenAI model.

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
1. GrantAide (Software Engineer) — Sept 2024–Jan 2025, San Jose
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

router.post("/conversations", async (req, res) => {
  try {
    const [conversation] = await db
      .insert(conversations)
      .values({ title: randomUUID() })
      .returning();

    res.status(201).json({
      id: String(conversation.id),
      createdAt: conversation.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create conversation");
    res.status(500).json({ error: "Failed to create conversation" });
  }
});

router.get("/conversations/:id/messages", async (req, res) => {
  try {
    const params = GetMessagesParams.parse(req.params);
    const id = parseInt(params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid conversation id" });

    const msgs = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, id))
      .orderBy(messages.createdAt);

    res.json(
      msgs.map((m) => ({
        id: m.id,
        conversationId: String(m.conversationId),
        role: m.role,
        content: m.content,
        createdAt: m.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to get messages");
    res.status(500).json({ error: "Failed to get messages" });
  }
});

router.post("/conversations/:id/messages", async (req, res) => {
  const params = SendMessageParams.safeParse(req.params);
  const body = SendMessageBody.safeParse(req.body);

  if (!params.success || !body.success) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const conversationId = parseInt(params.data.id, 10);
  if (isNaN(conversationId)) return res.status(400).json({ error: "Invalid conversation id" });

  const userContent = body.data.content;

  try {
    await db.insert(messages).values({
      conversationId,
      role: "user",
      content: userContent,
    });

    const history = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.createdAt);

    const chatMessages = [
      { role: "system" as const, content: SIDDHANT_SYSTEM_PROMPT },
      ...history.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let fullResponse = "";

    const stream = await openai.chat.completions.create({
      model: CHAT_MODEL,
      max_completion_tokens: 8192,
      messages: chatMessages,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullResponse += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    await db.insert(messages).values({
      conversationId,
      role: "assistant",
      content: fullResponse,
    });

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    req.log.error({ err }, "Failed to stream message");
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to process message" });
    } else {
      res.write(`data: ${JSON.stringify({ error: "Stream interrupted" })}\n\n`);
      res.end();
    }
  }
});

export default router;
