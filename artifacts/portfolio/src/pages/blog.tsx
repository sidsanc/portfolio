import { motion } from "framer-motion";
import { ExternalLink, Rss, PenLine } from "lucide-react";

const featuredTopics = [
  "AI Agent Orchestration",
  "Cloud Infrastructure at Scale",
  "Distributed Systems",
  "IAM & Security Engineering",
  "LLMs & RAG Pipelines",
  "Computer Vision",
  "DevOps & CI/CD",
  "Full Stack Engineering",
];

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-foreground">Blog</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Writing about AI systems, cloud infrastructure, distributed systems, and the craft of engineering.
        </p>
      </motion.div>

      {/* Main CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="neo-card p-12 mb-8 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary" />
        <div className="neo-inset w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <PenLine className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Read on Hashnode</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
          I publish deep dives, engineering lessons learned, and technical walkthroughs on Hashnode.
          Topics range from multi-agent AI architectures to production infrastructure at AWS scale.
        </p>
        <a
          href="https://hashnode.com/@sidsanc"
          target="_blank"
          rel="noopener noreferrer"
          className="neo-btn inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          <Rss className="w-5 h-5" />
          hashnode.com/@sidsanc
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>

      {/* Topics I Write About */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="neo-card p-8"
      >
        <h3 className="text-xl font-bold mb-6">Topics I Write About</h3>
        <div className="flex flex-wrap gap-4">
          {featuredTopics.map((topic, i) => (
            <motion.span
              key={topic}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="neo-btn px-5 py-2.5 text-sm font-medium text-foreground cursor-default"
            >
              {topic}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-muted-foreground mt-8"
      >
        New articles published regularly — follow on Hashnode to get notified.
      </motion.p>
    </div>
  );
}
