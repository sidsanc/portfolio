import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Terminal } from "lucide-react";

export default function Home() {
  const titleText = "Siddhant Sancheti".split("");

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="neo-inset p-8 rounded-full mb-8 inline-flex"
      >
        <Terminal className="w-16 h-16 text-primary" strokeWidth={1.5} />
      </motion.div>

      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-foreground flex gap-1 justify-center">
        {titleText.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
              ease: "easeOut",
            }}
            className={char === " " ? "mr-2" : ""}
          >
            {char}
          </motion.span>
        ))}
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl md:text-3xl text-muted-foreground font-medium mb-6">
          Software Development Engineer <span className="text-primary">@AWS</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Building precise, scalable distributed systems and frontier AI agent orchestration. Master of Cloud Infrastructure, orchestrating chaos into capability.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/projects">
            <span className="neo-btn px-8 py-4 text-lg font-medium text-foreground hover:text-primary cursor-pointer inline-flex items-center gap-2 group w-full sm:w-auto justify-center">
              View Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link href="/chat">
            <span className="neo-btn px-8 py-4 text-lg font-medium text-primary hover:text-primary cursor-pointer inline-flex items-center gap-2 w-full sm:w-auto justify-center">
              Chat with my AI
              <Terminal className="w-5 h-5" />
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
