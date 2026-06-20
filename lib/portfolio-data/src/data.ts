export const PERSONAL_INFO = {
  fullName: "Siddhant K. Sancheti",
  firstName: "Siddhant",
  location: "San Jose, CA",
  email: "siddhantsanchetik@gmail.com",
  title: "Software Development Engineer @ Amazon Web Services",
  bio: [
    "I'm a software engineer who operates at the intersection of cloud infrastructure and AI systems. Currently at AWS, I lead high-impact initiatives like zero-downtime IAM migrations across 110+ Lambda functions spanning 17 regions, and co-built a multi-agent code automation system that compresses multi-day workflows into hours.",
    "My background spans the full stack — from optimizing Kafka/Spark ETL pipelines for 100,000+ users to engineering RAG workflows that improved grant writing success rates by 85%. I hold an MS in Software Engineering from SJSU and a BE from Savitribai Phule Pune University, both with a 3.81 GPA.",
    "I'm drawn to problems where precision matters at scale — distributed systems that fail gracefully, AI agents that reason reliably, and infrastructure that adapts without human intervention.",
  ],
};

export const SOCIAL_LINKS = {
  github: "https://github.com/sidsanc",
  linkedin: "https://www.linkedin.com/in/siddhant-sancheti/",
  instagram: "https://www.instagram.com/sid_sanc4998_/",
  blog: "https://hashnode.com/@sidsanc",
  hashnodeUsername: "sidsanc",
  email: "siddhantsanchetik@gmail.com",
};

export const EDUCATION = [
  {
    degree: "MS Software Engineering",
    school: "San Jose State University",
    location: "San Jose, USA",
    period: "Aug 2022 – May 2024",
    gpa: "3.81",
  },
  {
    degree: "Bachelor of Engineering",
    school: "Savitribai Phule Pune University",
    location: "Pune, India",
    period: "Aug 2016 – May 2020",
    gpa: "3.81",
  },
];

export type ExperienceEntry = {
  company: string;
  role: string;
  location: string;
  period: string;
  current: boolean;
  highlights: string[];
  tags: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Amazon Web Services",
    role: "Software Development Engineer",
    location: "Seattle, WA",
    period: "May 2025 – Present",
    current: true,
    highlights: [
      "Led zero-downtime migration of Aurora PostgreSQL authentication from static credentials to IAM tokens across 110+ Lambda functions and CLI tools in 17 regions, handling 150–190 connections/sec with 100% IAM adoption and zero password fallback.",
      "Designed CDK infrastructure with least-privilege IAM policies; resolved critical production issues including S3 client connection leaks, file descriptor exhaustion, and cross-region token signing — improving system stability for high-throughput multi-region workloads.",
      "Co-designed and built a Python-based multi-agent code automation system that parsed SIM task tables into dependency DAGs, scheduled 5–10 parallel agent workflows with persistent state, resumable execution, and live monitoring — reducing 10-task implementation cycles from 5–7 days to 1–2 hours across a 195+ package ecosystem.",
      "Built a self-service fleet capacity management system using Java, DynamoDB, RPC APIs, and safe-by-default CLIs — reducing scaling workflows from 30 mins to 2–4 mins across 5,000+ EC2 hosts while preventing conflicting updates.",
    ],
    tags: ["CDK", "Java", "Python", "IAM", "Aurora PostgreSQL", "Lambda", "DynamoDB", "Multi-Agent AI"],
  },
  {
    company: "Mercor",
    role: "Web Development and Design Expert — OpenAI Contract",
    location: "Remote",
    period: "Jan 2025 – May 2025",
    current: false,
    highlights: [
      "Evaluated AI-generated React web applications for functionality, performance, and UI/UX, ensuring alignment with user requirements.",
      "Reviewed design consistency, feature integration, and accessibility standards to identify opportunities for improvement and maintain high-quality user experiences.",
      "Provided looped feedback to project teams, continuously refining features and design elements to meet evolving user needs and industry best practices.",
    ],
    tags: ["React", "UI/UX", "OpenAI", "Web Development", "Accessibility", "Design Review"],
  },
  {
    company: "GrantAide",
    role: "Software Engineer - ML/AI",
    location: "San Jose, CA",
    period: "Sept 2024 – Jan 2025",
    current: false,
    highlights: [
      "Built and scaled an AI-driven grant writing platform using React, GPT-4, Flask, AWS (S3, Amplify, EC2, Elastic Beanstalk), and Stripe APIs — improving platform responsiveness 5x.",
      "Engineered RAG workflows with Material-UI, Firebase, Vertex AI, LangChain, and FAISS — reducing frontend load times by 35%, query latency from 200ms to 50ms, improving response accuracy by 80%, and increasing grant application success rates by 85%.",
    ],
    tags: ["React", "GPT-4", "Flask", "LangChain", "FAISS", "VertexAI", "AWS", "RAG"],
  },
  {
    company: "Forsk Technologies",
    role: "Software Developer — Full Stack",
    location: "Jaipur, India",
    period: "Mar 2021 – Jun 2022",
    current: false,
    highlights: [
      "Architected an AI-enabled Campus Portal using React, Node.js, Express.js, AWS Lambda, DynamoDB, and ECS — integrating TensorFlow/PyTorch-based chatbot and feedback intelligence, reducing onboarding time by 50% for 5,000+ MAU.",
      "Optimized data access with GraphQL, reducing data load times by 20% and improving frontend performance by 30%.",
      "Automated deployment with Jenkins, GitHub Actions, Docker, and Grafana — increasing release frequency by 40% and maintaining 99.9% uptime.",
    ],
    tags: ["React", "Node.js", "GraphQL", "AWS Lambda", "DynamoDB", "Docker", "Jenkins", "TensorFlow"],
  },
  {
    company: "Pantech Prolabs",
    role: "Software Engineer",
    location: "Pune, India",
    period: "Jun 2020 – Feb 2021",
    current: false,
    highlights: [
      "Optimized asynchronous data pipelines for a job listing platform using Python, Kafka, Zookeeper, and Apache Spark — reducing processing time by 30% and enabling scalable ETL for high-volume data.",
      "Enforced secure RESTful APIs with Django, Flask, OAuth2, JWT, and Terraform — protecting 100,000+ users and reducing unauthorized access incidents by 45%.",
    ],
    tags: ["Python", "Kafka", "Apache Spark", "Django", "Flask", "OAuth2", "Terraform"],
  },
];

export type SkillGroup = {
  title: string;
  skills: string[];
  delay: number;
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["Python", "Java", "Ruby", "Bash", "TypeScript", "JavaScript", "SQL", "HTML5", "CSS3", "Shell"],
    delay: 0.1,
  },
  {
    title: "Cloud & Infrastructure",
    skills: ["AWS", "GCP", "Kubernetes", "Docker", "CI/CD", "Jenkins", "Git", "RESTful APIs", "Load Balancing"],
    delay: 0.2,
  },
  {
    title: "Frameworks & Tools",
    skills: ["AWS CDK", "React", "Node.js", "Express.js", "Flask", "Django", "Apache Spark", "Bootstrap", "Springboot", "Kafka"],
    delay: 0.3,
  },
  {
    title: "Databases",
    skills: ["AWS RDS", "DynamoDB", "PostgreSQL", "MongoDB", "Firebase"],
    delay: 0.4,
  },
  {
    title: "AI / ML Stack",
    skills: ["TensorFlow", "PyTorch", "JAX", "LangChain", "VertexAI", "FAISS", "Scikit-learn", "OpenCV", "Pandas", "NumPy", "TensorRT", "Keras", "MCP", "Sagemaker", "LLMs", "RAG", "NLP"],
    delay: 0.5,
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  highlight?: boolean;
  period: string;
  category: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Hive — Multi-Agent Harness for Production AI",
    description:
      "Open-source orchestration framework for deploying and managing multi-agent AI systems in production. Handles agent lifecycle, task routing, dependency resolution via DAGs, and fault tolerance at scale — designed to take prototype agent stacks and make them ops-ready.",
    tags: ["Python", "Multi-Agent", "AI Orchestration", "DAG", "Production AI"],
    github: "https://github.com/sidsanc/hive",
    highlight: true,
    period: "2024 – Present",
    category: "AI Systems",
  },
  {
    title: "AI-Driven Grant Writing Platform (GrantAide)",
    description:
      "End-to-end grant writing platform powered by GPT-4 and a custom RAG pipeline. Built with React, Flask, AWS, Vertex AI, LangChain and FAISS. Reduced query latency from 200ms to 50ms, improved response accuracy by 80%, and lifted grant application success rates by 85%.",
    tags: ["React", "GPT-4", "LangChain", "FAISS", "Flask", "Vertex AI", "AWS", "RAG"],
    period: "Sept 2024 – Jan 2025",
    category: "AI / Full Stack",
    highlight: true,
  },
  {
    title: "Advanced Lane Detection with Deep Learning",
    description:
      "Lane detection system for autonomous vehicles using the CARLA simulation environment. Combined ENet and Hourglass neural networks with RANSAC for robust line fitting — achieving 93.19% classification accuracy and 3.89% MAE under varied road and lighting conditions.",
    tags: ["Python", "PyTorch", "CARLA", "ENet", "Hourglass Networks", "RANSAC", "Computer Vision"],
    period: "Aug 2023 – May 2024",
    category: "Computer Vision",
  },
  {
    title: "Smart Image Store",
    description:
      "Intelligent image storage system where users upload images and retrieve them via natural language object tags. Google Cloud Vision API extracts object metadata; a custom HashMap-based index optimizes search. Built with MongoDB, React.js, Node.js — deployed on AWS with load balancing and auto-scaling.",
    tags: ["React.js", "Node.js", "MongoDB", "Google Cloud Vision", "AWS", "Load Balancing"],
    period: "Sept 2023 – Dec 2023",
    category: "Full Stack",
  },
  {
    title: "PDF Summarizer with LLMs",
    description:
      "Python tool that ingests long-form PDFs, chunks them, and generates faithful summaries using LLM prompting strategies. A practical playground for exploring chunking, context windows, and grounded summarization.",
    tags: ["Python", "LLMs", "Prompt Engineering", "NLP"],
    github: "https://github.com/sidsanc/PDFSummarizer",
    period: "2023",
    category: "AI / Full Stack",
  },
  {
    title: "VisionX — Image Caption Generator",
    description:
      "Deep learning image captioning model combining a CNN encoder with an LSTM decoder to generate natural language descriptions of images. Trained and evaluated on standard captioning benchmarks.",
    tags: ["Python", "PyTorch", "CNN", "LSTM", "Computer Vision", "NLP"],
    github: "https://github.com/sidsanc/VisionX-ImageCaptionGenerator",
    period: "2022",
    category: "Computer Vision",
  },
  {
    title: "Metamorphs — Fake News Detector",
    description:
      "ML pipeline that classifies news articles as real or fabricated using NLP feature engineering and classical classifiers. Built end-to-end in Jupyter — preprocessing, vectorization, model comparison, and evaluation.",
    tags: ["Python", "scikit-learn", "NLP", "Jupyter", "ML"],
    github: "https://github.com/sidsanc/Metamorphs",
    period: "2023",
    category: "AI / Full Stack",
  },
  {
    title: "Credit Card Processing System",
    description:
      "Java-based credit card processing system designed around clean OOP and structured testing. Covers transaction lifecycle, validation, and persistence.",
    tags: ["Java", "OOP", "Backend", "Testing"],
    github: "https://github.com/sidsanc/Credit-Card-Processing-System",
    period: "2023",
    category: "Full Stack",
  },
];

export const INTERESTS: string[] = [
  "Agentic AI",
  "Multi-Agent AI Systems",
  "Cloud Infrastructure at Scale",
  "Distributed Systems Design",
  "Computer Vision",
  "Open Source Development",
  "Developer Tooling",
];

export type HobbyItem = { label: string; emoji: string };

export const HOBBIES_ROW_1: HobbyItem[] = [
  { label: "Snowboarding", emoji: "🏂" },
  { label: "Biking", emoji: "🏍️" },
  { label: "Pickleball", emoji: "🏓" },
  { label: "Cricket", emoji: "🏏" },
  { label: "Valorant", emoji: "🎮" },
  { label: "Road Trips", emoji: "🛣️" },
];

export const HOBBIES_ROW_2: HobbyItem[] = [
  { label: "Guitar", emoji: "🎸" },
  { label: "Music", emoji: "🎧" },
  { label: "Blog Writing", emoji: "✍️" },
  { label: "Agentic AI", emoji: "🤖" },
  { label: "Coffee", emoji: "☕" },
];

export const BLOG_INFO = {
  platform: "Hashnode",
  url: "https://hashnode.com/@sidsanc",
  username: "sidsanc",
  description: "Siddhant writes about AI/ML, distributed systems, cloud engineering, and software development on Hashnode.",
};
