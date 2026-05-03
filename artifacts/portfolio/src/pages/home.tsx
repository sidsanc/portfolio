import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { useRef, useEffect, useState } from "react";

/* ─── Count-up hook ─── */
function useCountUp(target: number, duration = 1800, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, inView]);
  return count;
}

/* ─── Single metric card ─── */
interface MetricProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
  delay: number;
  inView: boolean;
}

function MetricCard({ value, prefix = "", suffix = "", label, sub, delay, inView }: MetricProps) {
  const count = useCountUp(value, 1600, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className="neo-card p-6 flex flex-col items-center text-center"
    >
      <div className="metric-value gradient-text mb-1">
        {prefix}{count}{suffix}
      </div>
      <div className="font-semibold text-foreground text-sm mb-0.5">{label}</div>
      <div className="text-xs text-muted-foreground leading-snug">{sub}</div>
    </motion.div>
  );
}

const METRICS = [
  { value: 110, suffix: "+", label: "Lambda Functions", sub: "migrated with zero downtime" },
  { value: 17,  suffix: "",  label: "AWS Regions",      sub: "global multi-region coverage" },
  { value: 85,  suffix: "%", label: "Faster Releases",  sub: "increased deployment frequency" },
  { value: 50,  suffix: "ms",label: "Query Latency",    sub: "down from 200 ms at GrantAide" },
  { value: 100, suffix: "K+",label: "Users Protected",  sub: "secured with OAuth2 & IAM" },
  { value: 5,   prefix: "5–10× ", suffix: "",label: "Agent Parallelism", sub: "concurrent automated workflows" },
];

/* ─── Page ─── */
export default function Home() {
  const firstName = "Siddhant".split("");
  const lastName  = "Sancheti".split("");

  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-80px" });

  return (
    <div className="flex flex-col items-center">

      {/* ── Hero ── */}
      <div className="min-h-[82vh] w-full flex flex-col items-center justify-center text-center relative overflow-hidden">

        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1.8 }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(96,165,250,0.09) 0%, rgba(129,140,248,0.06) 40%, transparent 70%)", filter: "blur(50px)" }}
          />
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.5 }}
            className="absolute bottom-1/4 right-1/3 w-[400px] h-[300px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(192,132,252,0.07) 0%, transparent 70%)", filter: "blur(50px)" }}
          />
        </div>

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="neo-btn inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-10 text-foreground/65"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Available for exceptional opportunities
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ml-1" />
        </motion.div>

        {/* Name — letter-by-letter reveal */}
        <h1 className="font-black tracking-[-0.04em] leading-none mb-6" style={{ fontSize: "clamp(3.2rem, 9vw, 8rem)" }}>
          <div className="flex gap-[0.01em] justify-center mb-1">
            {firstName.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
                className="gradient-text inline-block"
              >{char}</motion.span>
            ))}
          </div>
          <div className="flex gap-[0.01em] justify-center">
            {lastName.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.55, delay: 0.45 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
                className="text-foreground inline-block"
              >{char}</motion.span>
            ))}
          </div>
        </h1>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.9 }}
          className="mb-5"
        >
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            <span className="text-foreground/45">Software Development Engineer </span>
            <span className="gradient-warm">@AWS</span>
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.05 }}
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed font-light"
        >
          Building precise, scalable distributed systems and frontier AI agent orchestration.
          Orchestrating cloud infrastructure at the scale of millions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
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
            <span className="gradient-accent group-hover:opacity-80 transition-opacity">Download Resume</span>
            <Download className="w-4 h-4 text-primary group-hover:translate-y-0.5 transition-transform" />
          </a>

          <Link href="/chat">
            <span className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Chat with my AI
            </span>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 neo-inset rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-muted-foreground/40" />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Metrics Ticker ── */}
      <div ref={metricsRef} className="w-full max-w-5xl pb-24 px-4">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={metricsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/60 mb-3">
            Impact by numbers
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Results that speak at scale
          </h2>
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
          </div>
        </motion.div>

        {/* Metric cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {METRICS.map((m, i) => (
            <MetricCard
              key={m.label}
              {...m}
              delay={0.05 + i * 0.08}
              inView={metricsInView}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={metricsInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center text-xs text-muted-foreground/50 mt-8"
        >
          Figures from production systems at AWS, GrantAide, and Forsk Technologies.
        </motion.p>
      </div>

    </div>
  );
}
