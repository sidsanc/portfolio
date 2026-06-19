import { motion } from "framer-motion";
import { Terminal, Database, Cloud, Code2, BrainCircuit } from "lucide-react";

export default function Skills() {
  const skillGroups = [
    {
      title: "Languages",
      icon: <Code2 className="w-6 h-6" />,
      skills: ["Python", "Java", "Ruby", "Bash", "TypeScript", "JavaScript", "SQL", "HTML5", "CSS3", "Shell"],
      delay: 0.1
    },
    {
      title: "Cloud & Infrastructure",
      icon: <Cloud className="w-6 h-6" />,
      skills: ["AWS", "GCP", "Kubernetes", "Docker", "CI/CD", "Jenkins", "Git", "RESTful APIs", "Load Balancing"],
      delay: 0.2
    },
    {
      title: "Frameworks & Tools",
      icon: <Terminal className="w-6 h-6" />,
      skills: ["AWS CDK", "React", "Node.js", "Express.js", "Flask", "Django", "Apache Spark", "Bootstrap", "Springboot", "Kafka"],
      delay: 0.3
    },
    {
      title: "Databases",
      icon: <Database className="w-6 h-6" />,
      skills: ["AWS RDS", "DynamoDB", "PostgreSQL", "MongoDB", "Firebase"],
      delay: 0.4
    },
    {
      title: "AI / ML Stack",
      icon: <BrainCircuit className="w-6 h-6" />,
      skills: ["TensorFlow", "PyTorch", "JAX", "LangChain", "VertexAI", "FAISS", "Scikit-learn", "OpenCV", "Pandas", "NumPy", "TensorRT", "Keras", "MCP", "Sagemaker", "LLMs", "RAG", "NLP"],
      delay: 0.5
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="page-title gradient-text mb-4">Technical Arsenal</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          The languages, tools, and platforms I use to build scalable distributed systems and intelligent applications.
        </p>
      </motion.div>

      <div className="space-y-12">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: group.delay }}
            className="neo-card p-5 sm:p-8"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="neo-inset p-3 sm:p-4 rounded-xl text-primary shrink-0">
                {group.icon}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">{group.title}</h2>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {group.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
                  className="neo-btn px-4 py-2 text-sm font-medium text-foreground cursor-default select-none"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
