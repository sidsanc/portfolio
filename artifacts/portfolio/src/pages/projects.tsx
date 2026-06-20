import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { PROJECTS } from "@workspace/portfolio-data";

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
        {PROJECTS.map((project, index) => (
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
