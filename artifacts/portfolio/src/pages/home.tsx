import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Download, Github, Linkedin, Mail, Music2, Sparkles, Wrench } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";

/* ─── Star field canvas ─── */
function StarField({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();

    type Star = {
      x: number; y: number;
      size: number; opacity: number;
      vx: number; vy: number;
      phase: number; phaseSpeed: number;
    };

    const count = 90;
    const stars: Star[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.4 + 0.2,
      opacity: Math.random() * 0.45 + 0.08,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: Math.random() * 0.014 + 0.003,
    }));

    // Colour shifts with theme
    const rgb = isDark ? "180, 200, 255" : "70, 70, 100";
    const maxAlpha = isDark ? 1 : 0.55;

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        s.phase += s.phaseSpeed;

        if (s.x < -2) s.x = canvas.width + 2;
        if (s.x > canvas.width + 2) s.x = -2;
        if (s.y < -2) s.y = canvas.height + 2;
        if (s.y > canvas.height + 2) s.y = -2;

        const alpha = s.opacity * maxAlpha * (0.35 + 0.65 * Math.abs(Math.sin(s.phase)));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}

/* ─── Count-up hook ─── */
function useCountUp(target: number, duration = 1700, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, inView]);
  return count;
}

/* ─── Metric card ─── */
function MetricCard({
  value, prefix = "", suffix = "", label, sub, delay, inView,
}: {
  value: number; prefix?: string; suffix?: string;
  label: string; sub: string; delay: number; inView: boolean;
}) {
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
  { value: 110, suffix: "+",  label: "Lambda Functions",  sub: "migrated with zero downtime" },
  { value: 17,  suffix: "",   label: "AWS Regions",       sub: "global multi-region coverage" },
  { value: 85,  suffix: "%",  label: "Faster Releases",   sub: "increased deployment frequency" },
  { value: 50,  suffix: "ms", label: "Query Latency",     sub: "down from 200 ms at GrantAide" },
  { value: 100, suffix: "K+", label: "Users Protected",   sub: "secured with OAuth2 & IAM" },
  { value: 10,  prefix: "5–", suffix: "×", label: "Agent Parallelism", sub: "concurrent automated workflows" },
];

/* ─── Page ─── */
export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const socials = [
    { label: "GitHub",   href: "https://github.com/sidsanc",                      Icon: Github   },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/siddhant-sancheti/",  Icon: Linkedin },
    { label: "Email",    href: "mailto:siddhantsanchetik@gmail.com",               Icon: Mail     },
  ];

  // Scroll-reactive scroll indicator
  const { scrollY } = useScroll();
  const scrollHintOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  // Metrics section trigger
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-80px" });

  return (
    <div className="flex flex-col items-center">

      {/* ── Hero ── */}
      <div className="min-h-[82vh] w-full flex flex-col items-center justify-center text-center relative overflow-hidden">

        {/* Particle star field */}
        <StarField isDark={isDark} />

        {/* Soft radial glow blobs */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(ellipse, rgba(96,165,250,0.08) 0%, rgba(129,140,248,0.05) 45%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.6 }}
            className="absolute bottom-1/4 right-1/4 w-[420px] h-[320px] rounded-full"
            style={{
              background: "radial-gradient(ellipse, rgba(192,132,252,0.06) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 neo-btn inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-10 text-foreground/65"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Available for exceptional opportunities
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ml-1" />
        </motion.div>

        {/* Name — word-level reveal so gradient flows across the full word */}
        <h1
          className="relative z-10 font-black tracking-[-0.04em] leading-none mb-6"
          style={{ fontSize: "clamp(3.2rem, 9vw, 8rem)" }}
        >
          <div className="block text-center mb-1">
            <motion.span
              initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="gradient-text inline-block"
            >
              Siddhant
            </motion.span>
          </div>
          <div className="block text-center">
            <motion.span
              initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="gradient-text inline-block"
            >
              Sancheti
            </motion.span>
          </div>
        </h1>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.9 }}
          className="relative z-10 mb-5"
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
          className="relative z-10 text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed font-light"
        >
          Building precise, scalable distributed systems and frontier AI agent orchestration.
          Orchestrating cloud infrastructure at the scale of millions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.2 }}
          className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4"
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

        {/* Social links strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="relative z-10 flex items-center gap-2 mt-8"
        >
          <div className="h-px w-10 bg-border/60" />
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 1.55 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="neo-btn w-9 h-9 rounded-full flex items-center justify-center text-foreground/45 hover:text-foreground transition-colors group"
            >
              <s.Icon className="w-4 h-4" />
              {/* Tooltip */}
              <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-medium text-muted-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {s.label}
              </span>
            </motion.a>
          ))}
          <div className="h-px w-10 bg-border/60" />
        </motion.div>

        {/* Scroll indicator — fades out as user scrolls */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        >
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 font-medium"
          >
            Scroll
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 neo-inset rounded-full flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-1.5 rounded-full bg-muted-foreground/35" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Status Strip ── */}
      <div className="w-full max-w-4xl px-4 pb-12 -mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="neo-card p-1 rounded-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/50">

            {/* Currently building */}
            <div className="flex items-start gap-3 px-5 py-4">
              <div className="mt-0.5 w-7 h-7 rounded-lg neo-inset flex items-center justify-center shrink-0">
                <Wrench className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/45 font-semibold mb-0.5">
                  Building
                </p>
                <p className="text-sm font-medium text-foreground leading-snug">
                  Multi-agent code automation
                </p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">@ Amazon Web Services</p>
              </div>
              <span className="ml-auto shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 animate-pulse" />
            </div>

            {/* Reading */}
            <div className="flex items-start gap-3 px-5 py-4">
              <div className="mt-0.5 w-7 h-7 rounded-lg neo-inset flex items-center justify-center shrink-0">
                <BookOpen className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/45 font-semibold mb-0.5">
                  Reading
                </p>
                <p className="text-sm font-medium text-foreground leading-snug truncate">
                  Designing Data-Intensive Apps
                </p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">Martin Kleppmann</p>
              </div>
            </div>

            {/* Now playing — Spotify placeholder */}
            <div className="flex items-start gap-3 px-5 py-4">
              <div className="mt-0.5 w-7 h-7 rounded-lg neo-inset flex items-center justify-center shrink-0">
                <Music2 className="w-3.5 h-3.5 text-[#1DB954]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/45 font-semibold mb-0.5">
                  Listening
                </p>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium text-foreground/50 italic leading-snug">
                    Connect Spotify
                  </p>
                </div>
                <p className="text-xs text-muted-foreground/40 mt-0.5">to show now playing</p>
              </div>
              {/* Spotify soundwave bars animation */}
              <div className="flex items-end gap-0.5 h-5 mt-1.5 shrink-0 opacity-30">
                {[0.6, 1, 0.4, 0.8, 0.5].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 rounded-full bg-[#1DB954]"
                    animate={{ scaleY: [h, 1, h * 0.5, 1, h] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
                    style={{ height: "100%", transformOrigin: "bottom" }}
                  />
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      {/* ── Metrics Ticker ── */}
      <div ref={metricsRef} className="w-full max-w-5xl pb-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={metricsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/50 mb-3">
            Impact by numbers
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Results that speak at scale
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
          </div>
        </motion.div>

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

        <motion.p
          initial={{ opacity: 0 }}
          animate={metricsInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center text-xs text-muted-foreground/40 mt-8"
        >
          Figures from production systems at AWS, GrantAide, and Forsk Technologies.
        </motion.p>
      </div>
    </div>
  );
}
