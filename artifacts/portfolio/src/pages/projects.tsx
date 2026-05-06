import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  highlight?: boolean;
  period: string;
  category: string;
};

const projects: Project[] = [
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
      "End-to-end grant writing platform powered by GPT-4 and a custom RAG pipeline. Built with React, Flask, AWS (S3, Amplify, EC2, Elastic Beanstalk), Vertex AI, LangChain and FAISS. Reduced query latency from 200ms to 50ms, improved response accuracy by 80%, and lifted grant application success rates by 85%.",
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
      "Python tool that ingests long-form PDFs, chunks them, and generates faithful summaries using LLM prompting strategies. A practical playground for exploring chunking, context windows, and grounded summarization before they became table stakes.",
    tags: ["Python", "LLMs", "Prompt Engineering", "NLP"],
    github: "https://github.com/sidsanc/PDFSummarizer",
    period: "2023",
    category: "AI / Full Stack",
  },
  {
    title: "VisionX — Image Caption Generator",
    description:
      "Deep learning image captioning model combining a CNN encoder with an LSTM decoder to generate natural language descriptions of images. Trained and evaluated on standard captioning benchmarks as part of graduate computer vision coursework.",
    tags: ["Python", "PyTorch", "CNN", "LSTM", "Computer Vision", "NLP"],
    github: "https://github.com/sidsanc/VisionX-ImageCaptionGenerator",
    period: "2022",
    category: "Computer Vision",
  },
  {
    title: "Metamorphs — Fake News Detector",
    description:
      "ML pipeline that classifies news articles as real or fabricated using NLP feature engineering and classical classifiers. Built end-to-end in Jupyter — preprocessing, vectorization, model comparison, and evaluation against a labeled news corpus.",
    tags: ["Python", "scikit-learn", "NLP", "Jupyter", "ML"],
    github: "https://github.com/sidsanc/Metamorphs",
    period: "2023",
    category: "AI / Full Stack",
  },
  {
    title: "Credit Card Processing System",
    description:
      "Java-based credit card processing system designed around clean OOP and structured testing. Covers transaction lifecycle, validation, and persistence — a deliberate exercise in writing maintainable backend code with good separation of concerns.",
    tags: ["Java", "OOP", "Backend", "Testing"],
    github: "https://github.com/sidsanc/Credit-Card-Processing-System",
    period: "2023",
    category: "Full Stack",
  },
];

const categoryColors: Record<string, string> = {
  "AI Systems": "text-primary border-primary/30",
  "Computer Vision": "text-secondary border-secondary/30",
  "Full Stack": "text-green-500 border-green-500/30",
  "AI / Full Stack": "text-amber-500 border-amber-500/30",
};

export default function Projects() {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="page-title gradient-text mb-4">Projects</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From autonomous vehicle perception to production AI orchestration — each project pushing the boundary of what's deployable.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={`neo-card p-8 flex flex-col group cursor-default relative overflow-hidden ${project.highlight ? 'ring-1 ring-primary/20' : ''}`}
          >
            {project.highlight && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary" />
            )}

            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border neo-inset inline-block mb-3 ${categoryColors[project.category]}`}>
                  {project.category}
                </span>
                <h3 className="text-lg font-bold text-foreground leading-snug">{project.title}</h3>
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="neo-btn px-2.5 py-1 text-xs font-medium text-muted-foreground cursor-default">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{project.period}</span>
              <div className="flex items-center gap-3">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live demo"
                    className="neo-btn p-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub repository"
                    className="neo-btn p-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 neo-card p-8 text-center"
      >
        <p className="text-muted-foreground mb-4">See all projects and contributions on GitHub</p>
        <a
          href="https://github.com/sidsanc"
          target="_blank"
          rel="noopener noreferrer"
          className="neo-btn inline-flex items-center gap-2 px-6 py-3 font-medium text-foreground hover:text-primary transition-colors"
        >
          <Github className="w-5 h-5" />
          github.com/sidsanc
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  );
}
