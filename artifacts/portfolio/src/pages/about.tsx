import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
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

        {/* Parallax Photo Collage */}
        <ParallaxCollage />
      </motion.div>
    </div>
  );
}

// --- Parallax Collage ---------------------------------------------------------

type CollagePhoto = {
  src: string;
  caption: string;
  // Position as % of container (left, top)
  left: string;
  top: string;
  // Width in rem at md+; smaller on mobile via clamp
  width: string;
  rotate: number;
  // Parallax intensity in px (signed: negative = moves up faster, positive = lags)
  speed: number;
  z: number;
};

const PHOTOS: CollagePhoto[] = [
  { src: "/gallery/snowboard.jpg", caption: "First powder day 🏂", left: "2%",  top: "10%", width: "clamp(140px, 22vw, 260px)", rotate: -6, speed: -60,  z: 3 },
  { src: "/gallery/husky.jpg",     caption: "Tahoe with this guy 🐺", left: "32%", top: "8%",  width: "clamp(170px, 28vw, 320px)", rotate:  4, speed: -30,  z: 5 },
  { src: "/gallery/stanford.jpg",  caption: "Stanford on a clear day", left: "70%", top: "12%", width: "clamp(150px, 24vw, 280px)", rotate: -3, speed: -90,  z: 2 },
  { src: "/gallery/coffee.jpg",    caption: "24th & Mission, SF ☕",  left: "8%",  top: "38%", width: "clamp(140px, 22vw, 250px)", rotate:  7, speed:  40,  z: 4 },
  { src: "/gallery/bike.jpg",      caption: "Apache RR 310 days 🏍️", left: "42%", top: "42%", width: "clamp(160px, 26vw, 300px)", rotate: -5, speed:  70,  z: 6 },
  { src: "/gallery/guitar.jpg",    caption: "Strings & coffee 🎸",   left: "74%", top: "46%", width: "clamp(140px, 22vw, 260px)", rotate:  6, speed: -20,  z: 3 },
  { src: "/gallery/portrait.jpg",  caption: "Off-screen mode",        left: "22%", top: "70%", width: "clamp(140px, 22vw, 260px)", rotate: -4, speed: 100,  z: 4 },
];

function ParallaxCollage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      className="relative w-full mt-16"
      style={{ height: "clamp(750px, 95vw, 1100px)" }}
    >
      {/* Decorative blurred blobs */}
      <div className="absolute -top-10 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {PHOTOS.map((photo, i) => (
        <ParallaxPhoto
          key={photo.src}
          photo={photo}
          progress={scrollYProgress}
          index={i}
        />
      ))}
    </div>
  );
}

function ParallaxPhoto({
  photo,
  progress,
  index,
}: {
  photo: CollagePhoto;
  progress: MotionValue<number>;
  index: number;
}) {
  const y = useTransform(progress, [0, 1], [photo.speed, -photo.speed]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.92, 1.05, 0.92]);

  return (
    <motion.div
      className="absolute group cursor-default"
      style={{
        left: photo.left,
        top: photo.top,
        width: photo.width,
        rotate: photo.rotate,
        zIndex: photo.z,
        y,
        scale,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.08, rotate: 0, zIndex: 20, transition: { duration: 0.3 } }}
    >
      <div className="overflow-hidden rounded-2xl relative aspect-[4/5] shadow-2xl shadow-black/20 dark:shadow-black/50">
        <img
          src={photo.src}
          alt={photo.caption}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-xs font-medium drop-shadow">{photo.caption}</span>
        </div>
      </div>
    </motion.div>
  );
}
