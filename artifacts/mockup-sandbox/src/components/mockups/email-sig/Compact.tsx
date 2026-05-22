import { Mail, Linkedin, Github, Globe, Phone, BookOpen } from "lucide-react";

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const GRADIENT_TEXT: React.CSSProperties = {
  background: "linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const GRADIENT_BG: React.CSSProperties = {
  background: "linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)",
};

const links = [
  { icon: Mail,     href: "mailto:siddhantsanchetik@gmail.com", label: "Email" },
  { icon: Linkedin, href: "https://linkedin.com/in/siddhant-sancheti", label: "LinkedIn" },
  { icon: Github,   href: "https://github.com/sidsanc", label: "GitHub" },
  { icon: Globe,    href: "https://siddhantsancheti.com", label: "Portfolio" },
  { icon: Phone,    href: "tel:xxx-xxx-xxxx", label: "WhatsApp" },
  { icon: BookOpen, href: "https://hashnode.com/@sidsanc", label: "Hashnode" },
];

function FrostedCard({ dark }: { dark: boolean }) {
  const cardStyle: React.CSSProperties = dark ? {
    background: "linear-gradient(135deg, rgba(96,165,250,0.14) 0%, rgba(129,140,248,0.20) 50%, rgba(192,132,252,0.13) 100%)",
    backdropFilter: "blur(18px) saturate(160%)",
    WebkitBackdropFilter: "blur(18px) saturate(160%)",
    border: "1px solid rgba(255,255,255,0.11)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.09)",
  } : {
    background: "linear-gradient(135deg, rgba(96,165,250,0.28) 0%, rgba(129,140,248,0.34) 50%, rgba(192,132,252,0.24) 100%)",
    backdropFilter: "blur(18px) saturate(160%)",
    WebkitBackdropFilter: "blur(18px) saturate(160%)",
    border: "1px solid rgba(255,255,255,0.75)",
    boxShadow: "0 8px 32px rgba(80,60,140,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
  };

  const nameColor  = dark ? "#f1f5f9" : "#0f172a";
  const mutedColor = dark ? "#94a3b8" : "#374151";
  const divider    = dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.5)";
  const iconClass  = dark ? "text-slate-400 hover:text-blue-300" : "text-slate-600 hover:text-blue-600";

  return (
    <div style={{ ...cardStyle, position: "relative", overflow: "hidden" }}
         className="w-[520px] rounded-2xl px-5 py-4 flex items-center gap-4">
      {/* Crystalline noise layer */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: NOISE, backgroundSize: "256px 256px",
        opacity: dark ? 0.10 : 0.13,
        mixBlendMode: dark ? "soft-light" : "overlay",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, display: "contents" }}>
        <div style={GRADIENT_BG}
             className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg">
          SS
        </div>

        <div className="flex flex-col justify-center flex-grow min-w-0">
          <h1 style={{ color: nameColor }} className="font-bold text-base m-0 leading-tight truncate">
            Siddhant K. Sancheti
          </h1>
          <div className="flex flex-wrap items-center text-xs gap-x-1.5 leading-tight mt-0.5">
            <span className="font-semibold" style={GRADIENT_TEXT}>Software Development Engineer</span>
            <span style={{ color: mutedColor }}>·</span>
            <span style={{ color: mutedColor }} className="font-medium">Amazon Web Services</span>
          </div>
          <div style={{ color: dark ? "#64748b" : "#6b7280" }} className="text-[10px] mt-0.5">(xxx) xxx-xxxx</div>
        </div>

        <div style={{ backgroundColor: divider }} className="w-px h-10 mx-1 flex-shrink-0" />

        <div className="flex flex-wrap items-center gap-2 w-[76px] justify-center flex-shrink-0">
          {links.map((link, i) => (
            <a key={i} href={link.href} title={link.label} className={`transition-colors ${iconClass}`}>
              <link.icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Compact() {
  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-center gap-14 font-['Inter',sans-serif]">
      {/* Dark */}
      <div className="flex flex-col gap-3">
        <span className="text-slate-500 text-xs font-semibold tracking-widest uppercase ml-1">Dark</span>
        <div className="relative rounded-3xl overflow-hidden p-8"
             style={{ background: "linear-gradient(135deg, #060c18 0%, #0e1428 45%, #10082a 100%)" }}>
          <div className="absolute -top-12 -left-8 w-56 h-56 rounded-full blur-3xl opacity-30 pointer-events-none"
               style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)" }} />
          <div className="absolute -bottom-10 right-12 w-44 h-44 rounded-full blur-3xl opacity-25 pointer-events-none"
               style={{ background: "radial-gradient(circle, #60a5fa, transparent 70%)" }} />
          <FrostedCard dark={true} />
        </div>
      </div>

      {/* Light */}
      <div className="flex flex-col gap-3">
        <span className="text-slate-400 text-xs font-semibold tracking-widest uppercase ml-1">Light</span>
        <div className="relative rounded-3xl overflow-hidden p-8"
             style={{ background: "linear-gradient(135deg, #38bef8 0%, #818cf8 45%, #c084fc 100%)" }}>
          <div className="absolute -top-8 left-8 w-48 h-48 rounded-full blur-2xl opacity-50 pointer-events-none"
               style={{ background: "radial-gradient(circle, #ffffff, transparent 70%)" }} />
          <div className="absolute -bottom-6 right-8 w-36 h-36 rounded-full blur-2xl opacity-40 pointer-events-none"
               style={{ background: "radial-gradient(circle, #e0f2fe, transparent 70%)" }} />
          <FrostedCard dark={false} />
        </div>
      </div>
    </div>
  );
}
