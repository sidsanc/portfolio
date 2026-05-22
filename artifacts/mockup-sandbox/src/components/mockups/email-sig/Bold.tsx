import React from 'react';
import { Mail, Linkedin, Github, Globe, Phone, BookOpen } from 'lucide-react';

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const GRADIENT_TEXT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};
const GRADIENT_BG: React.CSSProperties = {
  background: 'linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)',
};

const LINKS = [
  { icon: Mail,     href: "mailto:siddhantsanchetik@gmail.com", label: "Email" },
  { icon: Linkedin, href: "https://linkedin.com/in/siddhant-sancheti",  label: "LinkedIn" },
  { icon: Github,   href: "https://github.com/sidsanc",                 label: "GitHub" },
  { icon: Globe,    href: "https://siddhantsancheti.com",               label: "Portfolio" },
  { icon: Phone,    href: "tel:xxx-xxx-xxxx",                           label: "WhatsApp" },
  { icon: BookOpen, href: "https://hashnode.com/@sidsanc",              label: "Blog" },
];

function Card({ dark }: { dark: boolean }) {
  const outerGlass: React.CSSProperties = dark ? {
    background: 'linear-gradient(135deg, rgba(96,165,250,0.13) 0%, rgba(129,140,248,0.20) 50%, rgba(192,132,252,0.12) 100%)',
    backdropFilter: 'blur(24px) saturate(170%)',
    WebkitBackdropFilter: 'blur(24px) saturate(170%)',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: '0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
  } : {
    background: 'linear-gradient(135deg, rgba(96,165,250,0.30) 0%, rgba(129,140,248,0.38) 50%, rgba(192,132,252,0.26) 100%)',
    backdropFilter: 'blur(24px) saturate(170%)',
    WebkitBackdropFilter: 'blur(24px) saturate(170%)',
    border: '1px solid rgba(255,255,255,0.80)',
    boxShadow: '0 16px 48px rgba(80,60,140,0.22), inset 0 1px 0 rgba(255,255,255,0.95)',
  };

  const pillGlass: React.CSSProperties = dark ? {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.08)',
  } : {
    background: 'rgba(255,255,255,0.45)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.85)',
  };

  const textColor  = dark ? '#e2e8f0' : '#0f172a';
  const mutedColor = dark ? '#94a3b8' : '#374151';
  const divider    = dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.45)';
  const avatarInner = dark ? 'rgba(10,14,28,0.88)' : 'rgba(255,255,255,0.82)';

  return (
    <div style={{ ...outerGlass, position: 'relative', overflow: 'hidden' }}
         className="w-[560px] rounded-2xl">
      {/* Gradient accent bar */}
      <div style={GRADIENT_BG} className="h-[3px] w-full" />

      {/* Crystalline noise */}
      <div style={{
        position: 'absolute', inset: 0, top: 3, pointerEvents: 'none', zIndex: 1,
        backgroundImage: NOISE, backgroundSize: '256px 256px',
        opacity: dark ? 0.10 : 0.14,
        mixBlendMode: dark ? 'soft-light' : 'overlay',
      }} />

      <div style={{ position: 'relative', zIndex: 2 }} className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold tracking-tight mb-0.5" style={GRADIENT_TEXT}>
            Siddhant K. Sancheti
          </h1>
          <p className="font-semibold text-[15px] mb-0" style={{ color: textColor }}>
            Software Development Engineer
          </p>
          <p className="text-xs mt-0.5" style={{ color: mutedColor }}>
            Amazon Web Services &nbsp;·&nbsp; Full Stack · ML-AI · Cloud
          </p>
        </div>

        <div className="h-px w-full mb-4" style={{ backgroundColor: divider }} />

        {/* Body */}
        <div className="flex gap-5">
          {/* Avatar + phone */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="w-[80px] h-[80px] rounded-full p-[2.5px]" style={GRADIENT_BG}>
              <div className="w-full h-full rounded-full flex items-center justify-center text-2xl font-bold"
                   style={{ background: avatarInner }}>
                <span style={GRADIENT_TEXT}>SS</span>
              </div>
            </div>
            <p className="text-[10px] font-medium" style={{ color: mutedColor }}>(xxx) xxx-xxxx</p>
          </div>

          {/* Pill chips */}
          <div className="flex-1 grid grid-cols-2 gap-2">
            {LINKS.map(({ icon: Icon, href, label }, i) => (
              <a key={i} href={href}
                 style={{ ...pillGlass, color: textColor }}
                 className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-opacity hover:opacity-75">
                <Icon className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span className="truncate">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Bold() {
  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-center gap-12 font-['Inter',sans-serif]">
      {/* Dark */}
      <div className="flex flex-col gap-3">
        <span className="text-slate-500 text-xs font-semibold tracking-widest uppercase ml-1">Dark</span>
        <div className="relative rounded-3xl overflow-hidden p-8"
             style={{ width: 648, background: "linear-gradient(135deg, #060c18 0%, #0e1428 40%, #10082a 100%)" }}>
          <div className="absolute -top-16 -left-8 w-64 h-64 rounded-full blur-3xl opacity-28 pointer-events-none"
               style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)" }} />
          <div className="absolute top-4 -right-10 w-56 h-56 rounded-full blur-3xl opacity-22 pointer-events-none"
               style={{ background: "radial-gradient(circle, #c084fc, transparent 70%)" }} />
          <div className="absolute -bottom-10 right-24 w-44 h-44 rounded-full blur-3xl opacity-18 pointer-events-none"
               style={{ background: "radial-gradient(circle, #60a5fa, transparent 70%)" }} />
          <Card dark={true} />
        </div>
      </div>

      {/* Light */}
      <div className="flex flex-col gap-3">
        <span className="text-slate-400 text-xs font-semibold tracking-widest uppercase ml-1">Light</span>
        <div className="relative rounded-3xl overflow-hidden p-8"
             style={{ width: 648, background: "linear-gradient(135deg, #22d3f5 0%, #818cf8 45%, #c084fc 100%)" }}>
          <div className="absolute -top-10 left-10 w-60 h-60 rounded-full blur-2xl opacity-55 pointer-events-none"
               style={{ background: "radial-gradient(circle, #ffffff, transparent 70%)" }} />
          <div className="absolute top-6 -right-6 w-48 h-48 rounded-full blur-2xl opacity-40 pointer-events-none"
               style={{ background: "radial-gradient(circle, #e0f2fe, transparent 70%)" }} />
          <div className="absolute -bottom-8 right-16 w-36 h-36 rounded-full blur-2xl opacity-35 pointer-events-none"
               style={{ background: "radial-gradient(circle, #f0e8ff, transparent 70%)" }} />
          <Card dark={false} />
        </div>
      </div>
    </div>
  );
}
