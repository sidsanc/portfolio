import React from 'react';
import { Mail, Linkedin, Github, Globe, Phone, BookOpen } from 'lucide-react';

const GRADIENT_TEXT = {
  background: 'linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const GRADIENT_BG = {
  background: 'linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)',
};

const DARK_CARD_GLASS = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(28px) saturate(200%)',
  WebkitBackdropFilter: 'blur(28px) saturate(200%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
};

const LIGHT_CARD_GLASS = {
  background: 'rgba(255, 255, 255, 0.58)',
  backdropFilter: 'blur(28px) saturate(200%)',
  WebkitBackdropFilter: 'blur(28px) saturate(200%)',
  border: '1px solid rgba(255, 255, 255, 0.92)',
  boxShadow: '0 16px 48px rgba(100,116,139,0.18), inset 0 1px 0 rgba(255,255,255,1)',
};

const DARK_PILL_GLASS = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.07)',
};

const LIGHT_PILL_GLASS = {
  background: 'rgba(255,255,255,0.7)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.95)',
};

const Card = ({ isDark }: { isDark: boolean }) => {
  const cardGlass = isDark ? DARK_CARD_GLASS : LIGHT_CARD_GLASS;
  const pillGlass = isDark ? DARK_PILL_GLASS : LIGHT_PILL_GLASS;
  const textColor = isDark ? '#e2e8f0' : '#1e293b';
  const mutedColor = isDark ? '#94a3b8' : '#64748b';
  const dividerColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  const links = [
    { icon: Mail, href: "mailto:siddhantsanchetik@gmail.com", label: "Email" },
    { icon: Linkedin, href: "https://linkedin.com/in/siddhant-sancheti", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/sidsanc", label: "GitHub" },
    { icon: Globe, href: "https://siddhantsancheti.com", label: "Portfolio" },
    { icon: Phone, href: "tel:xxx-xxx-xxxx", label: "WhatsApp" },
    { icon: BookOpen, href: "https://hashnode.com/@sidsanc", label: "Blog" },
  ];

  return (
    <div style={cardGlass} className="w-[560px] rounded-2xl relative overflow-hidden">
      {/* Gradient accent bar */}
      <div style={GRADIENT_BG} className="h-[3px] w-full" />

      <div className="p-6">
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

        <div className="h-px w-full mb-4" style={{ backgroundColor: dividerColor }} />

        {/* Body */}
        <div className="flex gap-5">
          {/* Avatar + phone */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <div className="w-[80px] h-[80px] rounded-full p-[2.5px]" style={GRADIENT_BG}>
              <div className="w-full h-full rounded-full flex items-center justify-center text-2xl font-bold"
                   style={{ background: isDark ? 'rgba(13,17,23,0.9)' : 'rgba(248,250,252,0.9)' }}>
                <span style={GRADIENT_TEXT}>SS</span>
              </div>
            </div>
            <p className="text-[10px] font-medium" style={{ color: mutedColor }}>(xxx) xxx-xxxx</p>
          </div>

          {/* Link chips */}
          <div className="flex-1 grid grid-cols-2 gap-2">
            {links.map(({ icon: Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                style={{ ...pillGlass, color: textColor }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-opacity hover:opacity-80"
              >
                <Icon className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span className="truncate">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export function Bold() {
  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-center gap-12 font-['Inter',sans-serif]">

      {/* Dark */}
      <div className="flex flex-col gap-3">
        <span className="text-neutral-500 text-xs font-semibold tracking-widest uppercase ml-1">Dark</span>
        <div className="relative rounded-3xl overflow-hidden p-8"
             style={{ width: 648, background: "linear-gradient(135deg, #060a14 0%, #0d1424 40%, #0a0f20 100%)" }}>
          <div className="absolute top-[-60px] left-[-30px] w-64 h-64 rounded-full opacity-25 blur-3xl pointer-events-none"
               style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)" }} />
          <div className="absolute top-[20px] right-[-40px] w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
               style={{ background: "radial-gradient(circle, #c084fc, transparent 70%)" }} />
          <div className="absolute bottom-[-30px] right-[100px] w-40 h-40 rounded-full opacity-15 blur-3xl pointer-events-none"
               style={{ background: "radial-gradient(circle, #60a5fa, transparent 70%)" }} />
          <Card isDark={true} />
        </div>
      </div>

      {/* Light */}
      <div className="flex flex-col gap-3">
        <span className="text-neutral-400 text-xs font-semibold tracking-widest uppercase ml-1">Light</span>
        <div className="relative rounded-3xl overflow-hidden p-8"
             style={{ width: 648, background: "linear-gradient(135deg, #d6e4f7 0%, #e8e2f8 40%, #d4eaf8 100%)" }}>
          <div className="absolute top-[-40px] left-[20px] w-56 h-56 rounded-full opacity-30 blur-3xl pointer-events-none"
               style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)" }} />
          <div className="absolute top-[30px] right-[-20px] w-48 h-48 rounded-full opacity-25 blur-3xl pointer-events-none"
               style={{ background: "radial-gradient(circle, #c084fc, transparent 70%)" }} />
          <div className="absolute bottom-[-20px] right-[80px] w-36 h-36 rounded-full opacity-20 blur-2xl pointer-events-none"
               style={{ background: "radial-gradient(circle, #60a5fa, transparent 70%)" }} />
          <Card isDark={false} />
        </div>
      </div>
    </div>
  );
}
