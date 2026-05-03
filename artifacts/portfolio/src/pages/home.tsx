import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Download, Sparkles } from "lucide-react";

const ROLES = ["SDE @ Amazon Web Services", "Cloud Infrastructure Engineer", "AI Systems Architect", "Distributed Systems Builder"];

export default function Home() {
  const firstName = "Siddhant".split("");
  const lastName = "Sancheti".split("");

  return (
    <div className="min-h-[82vh] flex flex-col items-center justify-center text-center relative overflow-hidden">

      {/* Ambient background glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(96,165,250,0.10) 0%, rgba(129,140,248,0.07) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(192,132,252,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="neo-btn inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-10 text-foreground/70"
      >
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        Available for exceptional opportunities
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ml-1" />
      </motion.div>

      {/* Name — animated letter by letter */}
      <h1 className="font-black tracking-[-0.04em] leading-none mb-6" style={{ fontSize: "clamp(3.2rem, 9vw, 8rem)" }}>
        <div className="flex gap-[0.02em] justify-center mb-1">
          {firstName.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
              className="gradient-text inline-block"
            >
              {char}
            </motion.span>
          ))}
        </div>
        <div className="flex gap-[0.02em] justify-center">
          {lastName.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.55, delay: 0.45 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
              className="text-foreground inline-block"
            >
              {char}
            </motion.span>
          ))}
        </div>
      </h1>

      {/* Role tag */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.9 }}
        className="mb-6"
      >
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
          <span className="text-foreground/50">Software Development Engineer </span>
          <span className="gradient-text-warm">@AWS</span>
        </h2>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 1.05 }}
        className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed font-light"
      >
        Building precise, scalable distributed systems and frontier AI agent orchestration.
        Orchestrating cloud infrastructure at the scale of millions.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 1.2 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link href="/projects">
          <span className="neo-btn px-8 py-3.5 text-base font-semibold text-foreground hover:text-primary cursor-pointer inline-flex items-center gap-2.5 group w-full sm:w-auto justify-center transition-colors">
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <a
          href="/resume.pdf"
          download="Siddhant_Sancheti_Resume.pdf"
          className="neo-btn px-8 py-3.5 text-base font-semibold cursor-pointer inline-flex items-center gap-2.5 w-full sm:w-auto justify-center transition-colors group"
        >
          <span className="gradient-text group-hover:opacity-80 transition-opacity">Download Resume</span>
          <Download className="w-4 h-4 text-primary group-hover:translate-y-0.5 transition-transform" />
        </a>

        <Link href="/chat">
          <span className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Chat with my AI
          </span>
        </Link>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 neo-inset rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-primary/60" />
        </motion.div>
      </motion.div>
    </div>
  );
}
