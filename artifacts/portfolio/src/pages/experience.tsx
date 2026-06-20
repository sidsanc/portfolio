import { motion } from "framer-motion";
import { Briefcase, MapPin, CalendarDays } from "lucide-react";

const experiences = [
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
    role: "Software Engineer",
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

export default function Experience() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="page-title gradient-text mb-4">Experience</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A track record of building reliable, high-impact systems across cloud, AI, and full-stack engineering.
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent hidden md:block" />

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative md:pl-24"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-8 w-5 h-5 rounded-full hidden md:flex items-center justify-center" style={{ transform: 'translateX(-50%)' }}>
                <div className={`w-4 h-4 rounded-full neo-inset ${exp.current ? 'bg-primary' : 'bg-secondary'}`} />
              </div>

              <div className="neo-card p-5 sm:p-8 relative overflow-hidden">
                {exp.current && (
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium text-green-500">Current</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                  <div className="neo-inset p-3 rounded-xl text-primary shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.company}</h3>
                    <p className="text-primary font-medium">{exp.role}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {exp.highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex gap-3 text-muted-foreground text-sm leading-relaxed"
                    >
                      <span className="text-primary mt-1 shrink-0">▸</span>
                      {highlight}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="neo-btn px-3 py-1 text-xs font-medium text-foreground cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
