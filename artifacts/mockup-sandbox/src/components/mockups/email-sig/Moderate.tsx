import React from 'react';
import { Mail, Linkedin, Github, Globe, Phone, BookOpen } from 'lucide-react';

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const GRADIENT_TEXT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};
const AWS_TEXT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #34d399, #60a5fa, #818cf8)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};
const AVATAR_BG: React.CSSProperties = {
  background: 'linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)',
};

function Card({ dark }: { dark: boolean }) {
  const cardStyle: React.CSSProperties = dark ? {
    background: 'linear-gradient(135deg, rgba(96,165,250,0.13) 0%, rgba(129,140,248,0.19) 55%, rgba(192,132,252,0.12) 100%)',
    backdropFilter: 'blur(20px) saturate(160%)',
    WebkitBackdropFilter: 'blur(20px) saturate(160%)',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
  } : {
    background: 'linear-gradient(135deg, rgba(96,165,250,0.30) 0%, rgba(129,140,248,0.36) 55%, rgba(192,132,252,0.26) 100%)',
    backdropFilter: 'blur(20px) saturate(160%)',
    WebkitBackdropFilter: 'blur(20px) saturate(160%)',
    border: '1px solid rgba(255,255,255,0.78)',
    boxShadow: '0 10px 40px rgba(80,60,140,0.2), inset 0 1px 0 rgba(255,255,255,0.92)',
  };

  const headingColor = dark ? '#f1f5f9' : '#0f172a';
  const mutedColor   = dark ? '#94a3b8'  : '#374151';
  const divider      = dark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.45)';
  const iconClass    = dark ? 'text-slate-400 hover:text-blue-300' : 'text-slate-600 hover:text-blue-600';

  return (
    <div style={{ ...cardStyle, position: 'relative', overflow: 'hidden' }}
         className="rounded-2xl p-5 w-full max-w-[520px]">
      {/* Crystalline noise */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: NOISE, backgroundSize: '256px 256px',
        opacity: dark ? 0.10 : 0.14,
        mixBlendMode: dark ? 'soft-light' : 'overlay',
      }} />

      <div style={{ position: 'relative', zIndex: 2 }} className="flex items-start gap-4">
        <div className="flex-shrink-0 w-[68px] h-[68px] rounded-full flex items-center justify-center text-white text-2xl font-bold"
             style={AVATAR_BG}>
          SS
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-[1.2rem] font-bold m-0 leading-tight" style={GRADIENT_TEXT}>
            Siddhant K. Sancheti
          </h2>
          <p className="font-semibold text-sm mt-0.5 mb-0" style={{ color: headingColor }}>
            Software Development Engineer
          </p>
          <p className="text-xs mt-0.5 mb-3" style={{ color: mutedColor }}>
            Full Stack | ML-AI | Cloud
          </p>

          <div className="h-px w-full mb-3" style={{ backgroundColor: divider }} />

          <div className="flex justify-between items-center gap-4">
            <div className="text-[13px] space-y-1">
              <div className="font-semibold" style={AWS_TEXT}>@ Amazon Web Services</div>
              <div style={{ color: mutedColor }}>(xxx) xxx-xxxx</div>
            </div>
            <div className="flex items-center gap-0.5">
              {[
                { icon: Mail,     href: "mailto:siddhantsanchetik@gmail.com" },
                { icon: Linkedin, href: "https://linkedin.com/in/siddhant-sancheti" },
                { icon: Github,   href: "https://github.com/sidsanc" },
                { icon: Globe,    href: "https://siddhantsancheti.com" },
                { icon: Phone,    href: "tel:xxx-xxx-xxxx" },
                { icon: BookOpen, href: "https://hashnode.com/@sidsanc" },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} className={`p-1.5 rounded-lg transition-colors ${iconClass}`}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Moderate() {
  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-center gap-12 font-['Inter',sans-serif]">
      {/* Dark */}
      <div className="flex flex-col gap-3">
        <span className="text-slate-500 text-xs font-semibold tracking-widest uppercase ml-1">Dark</span>
        <div className="relative rounded-3xl overflow-hidden p-8"
             style={{ width: 620, background: "linear-gradient(135deg, #060c18 0%, #0e1428 45%, #10082a 100%)" }}>
          <div className="absolute -top-14 right-0 w-60 h-60 rounded-full blur-3xl opacity-25 pointer-events-none"
               style={{ background: "radial-gradient(circle, #c084fc, transparent 70%)" }} />
          <div className="absolute -bottom-10 left-8 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
               style={{ background: "radial-gradient(circle, #60a5fa, transparent 70%)" }} />
          <Card dark={true} />
        </div>
      </div>

      {/* Light */}
      <div className="flex flex-col gap-3">
        <span className="text-slate-400 text-xs font-semibold tracking-widest uppercase ml-1">Light</span>
        <div className="relative rounded-3xl overflow-hidden p-8"
             style={{ width: 620, background: "linear-gradient(135deg, #38bef8 0%, #818cf8 45%, #c084fc 100%)" }}>
          <div className="absolute -top-10 right-4 w-52 h-52 rounded-full blur-2xl opacity-50 pointer-events-none"
               style={{ background: "radial-gradient(circle, #ffffff, transparent 70%)" }} />
          <div className="absolute -bottom-8 left-4 w-40 h-40 rounded-full blur-2xl opacity-40 pointer-events-none"
               style={{ background: "radial-gradient(circle, #e0f2fe, transparent 70%)" }} />
          <Card dark={false} />
        </div>
      </div>
    </div>
  );
}
