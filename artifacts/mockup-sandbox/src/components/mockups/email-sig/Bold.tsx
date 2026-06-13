import React from 'react';
import { Mail, Linkedin, Globe, Phone, BookOpen } from 'lucide-react';
import Github from 'lucide-react/dist/esm/icons/github';

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

/* ── Glass card ─────────────────────────────────────────────── */
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

  /* Solid, high-contrast text — no gradient on name */
  const nameColor = dark ? '#ffffff'  : '#0f172a';
  const roleColor = dark ? '#e2e8f0' : '#1e293b';
  const metaColor = dark ? '#94a3b8' : '#475569';
  const divider   = dark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.10)';
  const iconCol   = dark ? '#93c5fd' : '#2563eb';
  const pillText  = dark ? '#f1f5f9' : '#1e293b';
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
                width: '100%', height: '100%', borderRadius: '50%',
                objectFit: 'cover', display: 'block',
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
            <p style={{ color: metaColor, fontSize: 11, margin: '3px 0 0' }}>
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

/* ── Scene: gradient silk bg + tight neomorphic border ───────── */
function Scene({ dark, children }: { dark: boolean; children: React.ReactNode }) {
  // Outer shell — provides neomorphic shadow, no overflow clip
  const outerShell: React.CSSProperties = dark ? {
    borderRadius: 30,           // card(20) + padding(10)
    boxShadow: [
      '18px 22px 56px rgba(0,0,0,0.70)',      // main drop
      '-8px -8px 24px rgba(80,70,160,0.18)',  // top-left colour lift
    ].join(', '),
  } : {
    borderRadius: 30,
    boxShadow: [
      '18px 22px 56px rgba(50,20,140,0.38)',   // main drop (purple-tinted)
      '-10px -10px 28px rgba(255,255,255,0.55)', // top-left white highlight
    ].join(', '),
  };

  // Inner shell — gradient bg + orbs + overflow clip
  const innerShell: React.CSSProperties = dark ? {
    position: 'relative',
    borderRadius: 30,
    overflow: 'hidden',
    padding: 10,   // ← just 10px overflow around the card
    background: 'linear-gradient(135deg, #060c18 0%, #0e1428 42%, #10082a 100%)',
  } : {
    position: 'relative',
    borderRadius: 30,
    overflow: 'hidden',
    padding: 10,   // ← just 10px overflow around the card
    background: 'linear-gradient(135deg, #22d3f5 0%, #818cf8 48%, #c084fc 100%)',
  };

  return (
    <div style={outerShell}>
      <div style={innerShell}>
        {/* Colour orbs that feed the glass blur */}
        {dark ? (
          <>
            <div style={{ position: 'absolute', top: -64, left: -32, width: 260, height: 260, borderRadius: '50%', filter: 'blur(80px)', opacity: 0.28, background: 'radial-gradient(circle, #818cf8, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 16, right: -40, width: 220, height: 220, borderRadius: '50%', filter: 'blur(80px)', opacity: 0.22, background: 'radial-gradient(circle, #c084fc, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -40, right: 80, width: 180, height: 180, borderRadius: '50%', filter: 'blur(70px)', opacity: 0.18, background: 'radial-gradient(circle, #60a5fa, transparent 70%)', pointerEvents: 'none' }} />
          </>
        ) : (
          <>
            <div style={{ position: 'absolute', top: -40, left: 40, width: 240, height: 240, borderRadius: '50%', filter: 'blur(60px)', opacity: 0.55, background: 'radial-gradient(circle, #ffffff, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 24, right: -24, width: 190, height: 190, borderRadius: '50%', filter: 'blur(55px)', opacity: 0.40, background: 'radial-gradient(circle, #e0f2fe, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -32, right: 64, width: 150, height: 150, borderRadius: '50%', filter: 'blur(50px)', opacity: 0.35, background: 'radial-gradient(circle, #f0e8ff, transparent 70%)', pointerEvents: 'none' }} />
          </>
        )}
        {children}
      </div>
    </div>
  );
}

/* ── Export ──────────────────────────────────────────────────── */
export function Bold() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 52,
      padding: '52px 48px', fontFamily: "'Inter', sans-serif",
      background: '#0d1117',
    }}>
      {/* Dark */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ color: '#64748b', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginLeft: 2 }}>Dark</span>
        <Scene dark={true}><Card dark={true} /></Scene>
      </div>

      {/* Light */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ color: '#94a3b8', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginLeft: 2 }}>Light</span>
        <Scene dark={false}><Card dark={false} /></Scene>
      </div>
    </div>
  );
}
