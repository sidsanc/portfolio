import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";

const projects = [
  {
    title: "Hive — Multi-Agent Harness for Production AI",
    description:
      "An open-source orchestration framework for deploying and managing multi-agent AI systems in production. Handles agent lifecycle, task routing, dependency resolution, and fault tolerance at scale.",
    tags: ["Python", "Multi-Agent", "AI Orchestration", "DAG", "Production AI"],
    github: "https://github.com/sidsanc/hive",
    highlight: true,
    period: "2024 – Present",
    category: "AI Systems",
  },
  {
    title: "Advanced Lane Detection with Deep Learning",
    description:
      "Lane detection system for autonomous vehicles using CARLA simulation environment. Implemented ENet and Hourglass neural networks combined with RANSAC algorithms. Achieved 93.19% classification accuracy and 3.89% MAE — ensuring reliable detection under varied road conditions and lighting.",
    tags: ["Python", "CARLA", "ENet", "Hourglass Networks", "RANSAC", "Computer Vision", "PyTorch"],
    github: "https://github.com/sidsanc",
    period: "Aug 2023 – May 2024",
    category: "Computer Vision",
  },
  {
    title: "Smart Image Store",
    description:
      "Intelligent image storage system where users upload images and retrieve them via natural language object tags. Google Cloud Vision API extracts object metadata; a custom HashMap-based algorithm optimizes search. Built with MongoDB, React.js, and deployed on AWS with load balancing and auto-scaling.",
    tags: ["React.js", "MongoDB", "Google Cloud Vision", "AWS", "Node.js", "Load Balancing"],
    github: "https://github.com/sidsanc",
    period: "Sept 2023 – Dec 2023",
    category: "Full Stack",
  },
  {
    title: "AI-Driven Grant Writing Platform",
    description:
      "End-to-end grant writing platform powered by GPT-4 and a custom RAG pipeline. Built with React, Flask, AWS (S3, Amplify, EC2, Elastic Beanstalk), Vertex AI, LangChain, and FAISS. Reduced query latency from 200ms to 50ms, improved response accuracy by 80%, and increased grant application success rates by 85%.",
    tags: ["React", "GPT-4", "LangChain", "FAISS", "Flask", "VertexAI", "AWS", "RAG"],
    period: "Sept 2024 – Jan 2025",
    category: "AI / Full Stack",
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
        <h1 className="text-4xl font-bold mb-4 text-foreground">Projects</h1>
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
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
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
