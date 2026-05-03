import { motion } from "framer-motion";
import { MapPin, GraduationCap, Briefcase, Heart } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Years of Experience", value: "4+" },
    { label: "Projects Shipped", value: "15+" },
    { label: "Countries Worked", value: "3" },
    { label: "GPA (Both Degrees)", value: "3.81" },
  ];

  const interests = [
    "Multi-Agent AI Systems",
    "Cloud Infrastructure at Scale",
    "Distributed Systems Design",
    "Computer Vision",
    "Open Source Development",
    "Developer Tooling",
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-foreground">About Me</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Engineer at the frontier of cloud infrastructure and AI systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Avatar & Basic Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="neo-card p-8 flex flex-col items-center text-center"
        >
          <div className="neo-inset w-32 h-32 rounded-full flex items-center justify-center mb-6">
            <span className="text-5xl font-bold text-primary">SS</span>
          </div>
          <h2 className="text-2xl font-bold mb-1">Siddhant Sancheti</h2>
          <p className="text-primary font-medium mb-3">SDE @ Amazon Web Services</p>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span>San Jose, CA</span>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="neo-card p-8 lg:col-span-2"
        >
          <h3 className="text-xl font-bold mb-4 text-foreground">Background</h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm a software engineer who operates at the intersection of cloud infrastructure and AI systems.
              Currently at AWS, I lead high-impact initiatives like zero-downtime IAM migrations across 110+ Lambda
              functions spanning 17 regions, and co-built a multi-agent code automation system that compresses
              multi-day workflows into hours.
            </p>
            <p>
              My background spans the full stack — from optimizing Kafka/Spark ETL pipelines for 100,000+ users
              to engineering RAG workflows that improved grant writing success rates by 85%. I hold an MS in
              Software Engineering from SJSU and a BE from Savitribai Phule Pune University, both with a 3.81 GPA.
            </p>
            <p>
              I'm drawn to problems where precision matters at scale — distributed systems that fail gracefully,
              AI agents that reason reliably, and infrastructure that adapts without human intervention.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="neo-card p-6 text-center"
          >
            <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="neo-card p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="neo-inset p-3 rounded-xl text-primary">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">Education</h3>
          </div>
          <div className="space-y-6">
            <div>
              <p className="font-semibold text-foreground">MS Software Engineering</p>
              <p className="text-primary text-sm font-medium">San Jose State University</p>
              <p className="text-muted-foreground text-sm">Aug 2022 – May 2024 · GPA 3.81</p>
            </div>
            <div className="border-t border-border pt-6">
              <p className="font-semibold text-foreground">Bachelor of Engineering</p>
              <p className="text-primary text-sm font-medium">Savitribai Phule Pune University</p>
              <p className="text-muted-foreground text-sm">Aug 2016 – May 2020 · GPA 3.81</p>
            </div>
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="neo-card p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="neo-inset p-3 rounded-xl text-primary">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">Interests</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest, i) => (
              <motion.span
                key={interest}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.07 }}
                className="neo-btn px-4 py-2 text-sm text-foreground cursor-default"
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
