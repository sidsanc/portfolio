import React from 'react';
import { Mail, Linkedin, Github, Globe, Phone, BookOpen } from 'lucide-react';

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const GRAD_TEXT: React.CSSProperties = {
  background: 'linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const LINKS = [
  { icon: Mail,     href: 'mailto:siddhantsanchetik@gmail.com',        label: 'siddhantsanchetik@gmail.com' },
  { icon: Linkedin, href: 'https://linkedin.com/in/siddhant-sancheti', label: 'LinkedIn' },
  { icon: Github,   href: 'https://github.com/sidsanc',               label: 'GitHub' },
  { icon: Globe,    href: 'https://siddhantsancheti.com',              label: 'siddhantsancheti.com' },
  { icon: Phone,    href: 'https://wa.me/16693198812',                 label: '+1 (669) 319-8812' },
  { icon: BookOpen, href: 'https://hashnode.com/@sidsanc',            label: 'Hashnode Blog' },
];

function Card({ dark }: { dark: boolean }) {
  const glass: React.CSSProperties = dark ? {
    background: 'rgba(255,255,255,0.055)',
    backdropFilter: 'blur(44px) saturate(190%) brightness(1.06)',
    WebkitBackdropFilter: 'blur(44px) saturate(190%) brightness(1.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    boxShadow: [
      '0 28px 72px rgba(0,0,0,0.55)',
      'inset 0 1.5px 0 rgba(255,255,255,0.20)',
      'inset 0 -1px 0 rgba(0,0,0,0.15)',
      '0 0 0 0.5px rgba(255,255,255,0.06)',
    ].join(', '),
  } : {
    background: 'rgba(255,255,255,0.32)',
    backdropFilter: 'blur(44px) saturate(160%) brightness(1.08)',
    WebkitBackdropFilter: 'blur(44px) saturate(160%) brightness(1.08)',
    border: '1px solid rgba(255,255,255,0.85)',
    boxShadow: [
      '0 28px 72px rgba(60,30,120,0.20)',
      'inset 0 1.5px 0 rgba(255,255,255,1)',
      'inset 0 -1px 0 rgba(100,80,200,0.07)',
      '0 0 0 0.5px rgba(255,255,255,0.50)',
    ].join(', '),
  };

  const pill: React.CSSProperties = dark ? {
    background: 'rgba(255,255,255,0.07)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14)',
  } : {
    background: 'rgba(255,255,255,0.55)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.92)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,1)',
  };

  const textPrimary = dark ? '#f1f5f9' : '#0f172a';
  const textSub     = dark ? '#e2e8f0' : '#1e293b';
  const textMuted   = dark ? '#94a3b8' : '#374151';
  const divider     = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)';
  const iconCol     = dark ? '#93c5fd' : '#2563eb';
  const photoBorder = dark ? 'rgba(10,14,28,0.88)' : 'rgba(255,255,255,0.92)';

  return (
    <div style={{ ...glass, position: 'relative', overflow: 'hidden' }}
         className="w-[560px] rounded-[20px]">

      {/* Gradient accent line at top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg, #60a5fa, #818cf8, #c084fc)',
        zIndex: 4,
      }} />

      {/* Iridescent sheen — top-left to bottom-right, Apple-style thin-film interference */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: dark
          ? 'linear-gradient(155deg, rgba(148,197,255,0.09) 0%, transparent 38%, rgba(192,132,252,0.06) 100%)'
          : 'linear-gradient(155deg, rgba(255,255,255,0.28) 0%, transparent 45%, rgba(200,180,255,0.09) 100%)',
        borderRadius: 'inherit',
      }} />

      {/* Crystalline noise texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: NOISE, backgroundSize: '256px 256px',
        opacity: dark ? 0.07 : 0.09,
        mixBlendMode: dark ? 'soft-light' : 'overlay',
        borderRadius: 'inherit',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }} className="px-6 pt-7 pb-6">
        {/* Header: photo + identity */}
        <div className="flex items-center gap-4 mb-5">
          {/* Photo with gradient ring */}
          <div className="flex-shrink-0 rounded-full p-[2.5px]"
               style={{ background: 'linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)', width: 76, height: 76 }}>
            <img
              src="/__mockup/avatar.png"
              alt="Siddhant Sancheti"
              style={{
                width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover',
                border: `2.5px solid ${photoBorder}`,
                display: 'block',
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h1 style={{ ...GRAD_TEXT, fontSize: 20, fontWeight: 700, letterSpacing: '-0.3px', lineHeight: 1.2, margin: 0 }}>
              Siddhant K. Sancheti
            </h1>
            <p style={{ color: textSub, fontSize: 13.5, fontWeight: 600, margin: '3px 0 0' }}>
              Software Development Engineer
            </p>
            <p style={{ color: textMuted, fontSize: 11, margin: '3px 0 0' }}>
              Amazon Web Services&nbsp;&nbsp;·&nbsp;&nbsp;Full Stack&nbsp;·&nbsp;ML-AI&nbsp;·&nbsp;Cloud
            </p>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: divider, marginBottom: 16 }} />

        {/* Links grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {LINKS.map(({ icon: Icon, href, label }, i) => (
            <a key={i} href={href}
               style={{ ...pill, color: textPrimary, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 9, padding: '9px 12px', borderRadius: 12, fontSize: 11.5, fontWeight: 500 }}>
              <Icon size={13} style={{ color: iconCol, flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Bold() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12"
         style={{ padding: '48px 40px', fontFamily: "'Inter', sans-serif" }}>

      {/* ── Dark ── */}
      <div className="flex flex-col gap-3">
        <span style={{ color: '#64748b', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginLeft: 4 }}>
          Dark
        </span>
        <div style={{
          position: 'relative', width: 648, borderRadius: 28, overflow: 'hidden', padding: 32,
          background: 'linear-gradient(135deg, #060c18 0%, #0e1428 42%, #10082a 100%)',
        }}>
          <div style={{ position: 'absolute', top: -64, left: -32, width: 260, height: 260, borderRadius: '50%', filter: 'blur(80px)', opacity: 0.28, background: 'radial-gradient(circle, #818cf8, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 16, right: -40, width: 220, height: 220, borderRadius: '50%', filter: 'blur(80px)', opacity: 0.22, background: 'radial-gradient(circle, #c084fc, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, right: 80, width: 180, height: 180, borderRadius: '50%', filter: 'blur(70px)', opacity: 0.18, background: 'radial-gradient(circle, #60a5fa, transparent 70%)', pointerEvents: 'none' }} />
          <Card dark={true} />
        </div>
      </div>

      {/* ── Light ── */}
      <div className="flex flex-col gap-3">
        <span style={{ color: '#94a3b8', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginLeft: 4 }}>
          Light
        </span>
        <div style={{
          position: 'relative', width: 648, borderRadius: 28, overflow: 'hidden', padding: 32,
          background: 'linear-gradient(135deg, #22d3f5 0%, #818cf8 48%, #c084fc 100%)',
        }}>
          <div style={{ position: 'absolute', top: -40, left: 40, width: 240, height: 240, borderRadius: '50%', filter: 'blur(60px)', opacity: 0.55, background: 'radial-gradient(circle, #ffffff, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 24, right: -24, width: 190, height: 190, borderRadius: '50%', filter: 'blur(55px)', opacity: 0.40, background: 'radial-gradient(circle, #e0f2fe, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -32, right: 64, width: 150, height: 150, borderRadius: '50%', filter: 'blur(50px)', opacity: 0.35, background: 'radial-gradient(circle, #f0e8ff, transparent 70%)', pointerEvents: 'none' }} />
          <Card dark={false} />
        </div>
      </div>

    </div>
  );
}
