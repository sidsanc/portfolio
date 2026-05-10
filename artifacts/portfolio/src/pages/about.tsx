import { motion } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Heart,
  Download,
  PenLine,
  Trophy,
  Gamepad2,
  Mountain,
  Music2,
  Headphones,
  Sparkles,
} from "lucide-react";

export default function About() {
  const stats = [
    { label: "Years of Experience", value: "2+" },
    { label: "Projects Shipped", value: "15+" },
    { label: "GPA (Both Degrees)", value: "3.81" },
  ];

  const interests = [
    "Agentic AI",
    "Multi-Agent AI Systems",
    "Cloud Infrastructure at Scale",
    "Distributed Systems Design",
    "Computer Vision",
    "Open Source Development",
    "Developer Tooling",
  ];

  const hobbies = [
    { label: "Blog Writing", icon: PenLine, accent: "from-blue-500/20 to-cyan-500/20" },
    { label: "Pickleball", icon: Trophy, accent: "from-amber-500/20 to-orange-500/20" },
    { label: "Cricket", icon: Trophy, accent: "from-emerald-500/20 to-green-500/20" },
    { label: "Valorant", icon: Gamepad2, accent: "from-rose-500/20 to-red-500/20" },
    { label: "Snowboarding", icon: Mountain, accent: "from-sky-500/20 to-indigo-500/20" },
    { label: "Guitar", icon: Music2, accent: "from-purple-500/20 to-fuchsia-500/20" },
    { label: "Music", icon: Headphones, accent: "from-violet-500/20 to-pink-500/20" },
  ];

  // Drop images into artifacts/portfolio/public/gallery/ matching these names.
  const gallery = [
    { src: "/gallery/snowboarding.jpg", caption: "First powder day 🏂" },
    { src: "/gallery/cricket.jpg", caption: "Weekend cricket league" },
    { src: "/gallery/pickleball.jpg", caption: "Pickleball doubles" },
    { src: "/gallery/guitar.jpg", caption: "Strings & coffee" },
    { src: "/gallery/concert.jpg", caption: "Live music nights" },
    { src: "/gallery/travel.jpg", caption: "On the road" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="page-title gradient-text mb-4">About Me</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
          Engineer at the frontier of cloud infrastructure and AI systems.
        </p>
        <a
          href="/resume.pdf"
          download="Siddhant_Sancheti_Resume.pdf"
          className="neo-btn inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-colors group"
        >
          <span className="gradient-text">Download Resume</span>
          <Download className="w-4 h-4 text-primary group-hover:translate-y-0.5 transition-transform" />
        </a>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Avatar & Basic Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="neo-card p-8 flex flex-col items-center text-center"
        >
          <div className="neo-inset w-32 h-32 rounded-full flex items-center justify-center mb-6 overflow-hidden p-1.5">
            <img
              src="/avatar.png"
              alt="Siddhant Sancheti"
              className="w-full h-full object-cover rounded-full"
            />
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
        className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12"
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
            <h3 className="text-xl font-bold">Professional Interests</h3>
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

      {/* Beyond Code — hobbies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-bold gradient-text">Beyond Code</h2>
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <p className="text-center text-muted-foreground mb-8">
          When I'm not shipping software, you'll find me here.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
          {hobbies.map((hobby, i) => {
            const Icon = hobby.icon;
            return (
              <motion.div
                key={hobby.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65 + i * 0.05 }}
                whileHover={{ y: -4 }}
                className="neo-card p-5 flex flex-col items-center text-center gap-3 cursor-default"
              >
                <div
                  className={`neo-inset w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${hobby.accent}`}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{hobby.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Photo Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.07 }}
              whileHover={{ scale: 1.02 }}
              className="neo-card p-2 overflow-hidden group relative"
            >
              <div className="aspect-square rounded-xl overflow-hidden relative bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 flex items-end justify-center p-3 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-medium">{photo.caption}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4 italic">
          Drop photos into <code className="px-1.5 py-0.5 rounded bg-muted">public/gallery/</code> to fill this gallery.
        </p>
      </motion.div>
    </div>
  );
}
