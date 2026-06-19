import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, BookOpen, ExternalLink, Send, Download } from "lucide-react";

const socials = [
  {
    label: "GitHub",
    value: "github.com/sidsanc",
    href: "https://github.com/sidsanc",
    icon: <Github className="w-6 h-6" />,
    description: "Open source projects and contributions",
    color: "text-foreground",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/siddhant-sancheti",
    href: "https://www.linkedin.com/in/siddhant-sancheti/",
    icon: <Linkedin className="w-6 h-6" />,
    description: "Professional network and career updates",
    color: "text-blue-400",
  },
  {
    label: "Hashnode",
    value: "hashnode.com/@sidsanc",
    href: "https://hashnode.com/@sidsanc",
    icon: <BookOpen className="w-6 h-6" />,
    description: "Technical writing and engineering articles",
    color: "text-primary",
  },
  {
    label: "Instagram",
    value: "@sid_sanc4998_",
    href: "https://www.instagram.com/sid_sanc4998_/",
    icon: <Instagram className="w-6 h-6" />,
    description: "Life outside of engineering",
    color: "text-pink-400",
  },
];

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="page-title gradient-text mb-4">Get in Touch</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Open to interesting conversations, collaboration opportunities, and roles at the frontier of AI and software engineering.
        </p>
      </motion.div>

      {/* Main CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="neo-card p-10 mb-8 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary" />
        <div className="neo-inset w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="w-9 h-9 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Let's Connect</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Whether it's a technical discussion, a collaboration opportunity, or just saying hi — reach out.
        </p>
        <a
          href="mailto:siddhantsanchetik@gmail.com"
          className="neo-btn inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          <Mail className="w-5 h-5" />
          siddhantsanchetik@gmail.com
        </a>
      </motion.div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {socials.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            target={social.href.startsWith("mailto") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.08 }}
            whileHover={{ y: -3, scale: 1.01 }}
            className="neo-card p-6 flex items-start gap-5 group cursor-pointer no-underline hover:no-underline"
          >
            <div className={`neo-inset p-4 rounded-xl shrink-0 ${social.color} group-hover:scale-110 transition-transform`}>
              {social.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-foreground">{social.label}</p>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
              <p className="text-primary text-sm font-mono truncate">{social.value}</p>
              <p className="text-muted-foreground text-xs mt-1">{social.description}</p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Resume download */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="mt-8 text-center"
      >
        <a
          href="/resume.pdf"
          download="Siddhant_Sancheti_Resume.pdf"
          className="neo-btn inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors group"
        >
          <span className="gradient-text">Download Resume</span>
          <Download className="w-4 h-4 text-primary group-hover:translate-y-0.5 transition-transform" />
        </a>
      </motion.div>
    </div>
  );
}
