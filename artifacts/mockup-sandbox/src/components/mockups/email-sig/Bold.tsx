import React from 'react';
import { Mail, Linkedin, Github, Globe, Phone, BookOpen } from 'lucide-react';

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const GRAD_BG: React.CSSProperties = {
  background: 'linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)',
};

const LINKS = [
  { icon: Mail,     href: 'mailto:siddhantsanchetik@gmail.com',        label: 'siddhantsanchetik@gmail.com' },
  { icon: Linkedin, href: 'https://linkedin.com/in/siddhant-sancheti', label: 'LinkedIn' },
  { icon: Github,   href: 'https://github.com/sidsanc',               label: 'GitHub' },
  { icon: Globe,    href: 'https://siddhantsancheti.com',              label: 'siddhantsancheti.com' },
  { icon: Phone,    href: 'https://wa.me/16693198812',                 label: '+1 (669) 319-8812' },
  { icon: BookOpen, href: 'https://hashnode.com/@sidsanc',            label: 'Hashnode Blog' },
];

/* ─── Glass card ─────────────────────────────────────────────── */
function Card({ dark }: { dark: boolean }) {
  const glass: React.CSSProperties = dark ? {
    background: 'rgba(255,255,255,0.055)',
    backdropFilter: 'blur(44px) saturate(190%) brightness(1.06)',
    WebkitBackdropFilter: 'blur(44px) saturate(190%) brightness(1.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    boxShadow: [
      '0 8px 32px rgba(0,0,0,0.45)',
      'inset 0 1.5px 0 rgba(255,255,255,0.22)',
      'inset 0 -1px 0 rgba(0,0,0,0.18)',
    ].join(', '),
  } : {
    background: 'rgba(255,255,255,0.34)',
    backdropFilter: 'blur(44px) saturate(160%) brightness(1.06)',
    WebkitBackdropFilter: 'blur(44px) saturate(160%) brightness(1.06)',
    border: '1px solid rgba(255,255,255,0.90)',
    boxShadow: [
      '0 8px 32px rgba(80,50,160,0.14)',
      'inset 0 1.5px 0 rgba(255,255,255,1)',
      'inset 0 -1px 0 rgba(100,80,200,0.06)',
    ].join(', '),
  };

  const pill: React.CSSProperties = dark ? {
    background: 'rgba(255,255,255,0.07)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.13)',
  } : {
    background: 'rgba(255,255,255,0.60)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.95)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,1)',
  };

  /* High-contrast text — solid colors, no gradient on name */
  const nameColor  = dark ? '#ffffff'  : '#0f172a';
  const roleColor  = dark ? '#e2e8f0' : '#1e293b';
  const metaColor  = dark ? '#94a3b8' : '#475569';
  const divider    = dark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.10)';
  const iconCol    = dark ? '#93c5fd' : '#2563eb';
  const pillText   = dark ? '#f1f5f9' : '#1e293b';
  const photoBorder = dark ? 'rgba(10,14,28,0.85)' : 'rgba(255,255,255,0.92)';

  return (
    <div style={{ ...glass, position: 'relative', overflow: 'hidden', borderRadius: 20 }}>
      {/* Top gradient accent bar */}
      <div style={{ ...GRAD_BG, position: 'absolute', top: 0, left: 0, right: 0, height: 3, zIndex: 4 }} />

      {/* Iridescent sheen */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, borderRadius: 'inherit',
        background: dark
          ? 'linear-gradient(155deg, rgba(148,197,255,0.08) 0%, transparent 40%, rgba(192,132,252,0.05) 100%)'
          : 'linear-gradient(155deg, rgba(255,255,255,0.30) 0%, transparent 50%, rgba(200,180,255,0.08) 100%)',
      }} />

      {/* Crystalline noise */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, borderRadius: 'inherit',
        backgroundImage: NOISE, backgroundSize: '256px 256px',
        opacity: dark ? 0.07 : 0.09,
        mixBlendMode: dark ? 'soft-light' : 'overlay',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '24px 22px 20px' }}>
        {/* Photo + identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
          <div style={{ ...GRAD_BG, flexShrink: 0, borderRadius: '50%', padding: 2.5, width: 72, height: 72 }}>
            <img
              src="/__mockup/avatar.png"
              alt="Siddhant Sancheti"
              style={{
                width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block',
                border: `2.5px solid ${photoBorder}`,
              }}
            />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h1 style={{ color: nameColor, fontSize: 19, fontWeight: 800, letterSpacing: '-0.3px', lineHeight: 1.2, margin: 0 }}>
              Siddhant K. Sancheti
            </h1>
            <p style={{ color: roleColor, fontSize: 13, fontWeight: 600, margin: '4px 0 0' }}>
              Software Development Engineer
            </p>
            <p style={{ color: metaColor, fontSize: 11, margin: '3px 0 0', letterSpacing: '0.01em' }}>
              Amazon Web Services&nbsp;·&nbsp;Full Stack&nbsp;·&nbsp;ML-AI&nbsp;·&nbsp;Cloud
            </p>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: divider, marginBottom: 14 }} />

        {/* Link pills */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
          {LINKS.map(({ icon: Icon, href, label }, i) => (
            <a key={i} href={href} style={{
              ...pill, color: pillText, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 11px', borderRadius: 11,
              fontSize: 11.5, fontWeight: 500,
            }}>
              <Icon size={13} style={{ color: iconCol, flexShrink: 0 }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Scene wrapper — neomorphic silk sheet ──────────────────── */
function SilkScene({ dark, children }: { dark: boolean; children: React.ReactNode }) {
  const silk: React.CSSProperties = dark ? {
    /* Dark silk — deep navy with warm purple undertone */
    background: 'linear-gradient(145deg, #0d1528 0%, #111830 40%, #0f0d24 100%)',
    boxShadow: [
      /* convex neomorphic lift */
      '14px 18px 44px rgba(0,0,0,0.70)',
      '-6px -6px 20px rgba(90,80,160,0.18)',
      /* inner silk texture */
      'inset 2px 2px 6px rgba(255,255,255,0.04)',
      'inset -2px -2px 6px rgba(0,0,0,0.40)',
    ].join(', '),
  } : {
    /* Light silk — soft lavender-pearl */
    background: 'linear-gradient(145deg, #dce7ff 0%, #ecdeff 45%, #d8ebff 100%)',
    boxShadow: [
      /* convex neomorphic lift */
      '14px 18px 44px rgba(140,120,200,0.28)',
      '-8px -8px 22px rgba(255,255,255,0.92)',
      /* inner silk sheen */
      'inset 2px 2px 6px rgba(255,255,255,0.75)',
      'inset -2px -2px 6px rgba(140,120,200,0.14)',
    ].join(', '),
  };

  return (
    /* padding = 10px — just overflows the card edge enough to show the shadow ring */
    <div style={{ ...silk, padding: 10, borderRadius: 30, display: 'inline-block' }}>
      {children}
    </div>
  );
}

/* ─── Export ─────────────────────────────────────────────────── */
export function Bold() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 48,
      padding: '48px 40px', fontFamily: "'Inter', sans-serif",
      background: '#1a1a2e',
    }}>
      {/* Dark */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ color: '#64748b', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginLeft: 2 }}>
          Dark
        </span>
        <SilkScene dark={true}>
          <Card dark={true} />
        </SilkScene>
      </div>

      {/* Light */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ color: '#94a3b8', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginLeft: 2 }}>
          Light
        </span>
        <SilkScene dark={false}>
          <Card dark={false} />
        </SilkScene>
      </div>
    </div>
  );
}
