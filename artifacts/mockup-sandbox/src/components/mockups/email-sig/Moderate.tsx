import React from 'react';
import { Mail, Linkedin, Globe, Phone, BookOpen } from 'lucide-react';
import Github from 'lucide-react/dist/esm/icons/github';

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const AVATAR_RING: React.CSSProperties = {
  background: 'linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)',
};

const LINKS = [
  { icon: Mail,     href: 'mailto:siddhantsanchetik@gmail.com' },
  { icon: Linkedin, href: 'https://linkedin.com/in/siddhant-sancheti' },
  { icon: Github,   href: 'https://github.com/sidsanc' },
  { icon: Globe,    href: 'https://siddhantsancheti.com' },
  { icon: Phone,    href: 'https://wa.me/16693198812' },
  { icon: BookOpen, href: 'https://hashnode.com/@sidsanc' },
];

function Card({ dark }: { dark: boolean }) {
  const cardStyle: React.CSSProperties = dark ? {
    background: 'linear-gradient(135deg, rgba(96,165,250,0.13) 0%, rgba(129,140,248,0.19) 55%, rgba(192,132,252,0.12) 100%)',
    backdropFilter: 'blur(20px) saturate(160%)',
    WebkitBackdropFilter: 'blur(20px) saturate(160%)',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: '20px 22px',
    position: 'relative',
    overflow: 'hidden',
  } : {
    background: 'rgba(255,255,255,0.22)',
    backdropFilter: 'blur(20px) saturate(160%)',
    WebkitBackdropFilter: 'blur(20px) saturate(160%)',
    border: '1px solid rgba(255,255,255,0.78)',
    boxShadow: '0 10px 40px rgba(80,60,140,0.2), inset 0 1px 0 rgba(255,255,255,0.92)',
    borderRadius: 16,
    padding: '20px 22px',
    position: 'relative',
    overflow: 'hidden',
  };

  /* Name gradient — contrasting per mode */
  const nameGrad: React.CSSProperties = dark ? {
    background: 'linear-gradient(135deg, #7dd3fc, #a5b4fc, #e879f9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } : {
    /* Warm gold/white gradient — pops against the cool cyan→purple bg */
    background: 'linear-gradient(135deg, #ffffff 0%, #fde68a 60%, #fb923c 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const awsGrad: React.CSSProperties = dark ? {
    background: 'linear-gradient(135deg, #34d399, #60a5fa, #818cf8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } : {
    background: 'linear-gradient(135deg, #a5f3fc, #c7d2fe)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const roleColor  = dark ? '#e2e8f0' : 'rgba(255,255,255,0.95)';
  const metaColor  = dark ? '#94a3b8' : 'rgba(255,255,255,0.75)';
  const divider    = dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.35)';
  const iconColor  = dark ? '#93c5fd' : 'rgba(255,255,255,0.85)';
  const photoBorder = dark ? 'rgba(10,14,28,0.85)' : 'rgba(255,255,255,0.85)';

  return (
    <div style={cardStyle}>
      {/* Crystalline noise */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: NOISE, backgroundSize: '256px 256px',
        opacity: dark ? 0.10 : 0.14,
        mixBlendMode: dark ? 'soft-light' : 'overlay',
        borderRadius: 'inherit',
      }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        {/* Avatar with photo */}
        <div style={{ ...AVATAR_RING, flexShrink: 0, borderRadius: '50%', padding: 2.5, width: 68, height: 68 }}>
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

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Name with contrasting gradient */}
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, lineHeight: 1.2, letterSpacing: '-0.2px', ...nameGrad }}>
            Siddhant K. Sancheti
          </h2>
          <p style={{ fontWeight: 600, fontSize: 13, marginTop: 3, marginBottom: 0, color: roleColor }}>
            Software Development Engineer
          </p>
          <p style={{ fontSize: 11, marginTop: 3, marginBottom: 12, color: metaColor }}>
            Full Stack&nbsp;·&nbsp;ML-AI&nbsp;·&nbsp;Cloud
          </p>

          <div style={{ height: 1, backgroundColor: divider, marginBottom: 12 }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 13 }}>
              <div style={{ fontWeight: 600, ...awsGrad }}>@ Amazon Web Services</div>
              <div style={{ color: metaColor, marginTop: 2 }}>+1 (669) 319-8812</div>
            </div>
            {/* Icon row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {LINKS.map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} style={{
                  padding: 6, borderRadius: 8, display: 'flex', alignItems: 'center',
                  color: iconColor, textDecoration: 'none',
                }}>
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
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 48,
      padding: '52px 48px', fontFamily: "'Plus Jakarta Sans', sans-serif",
      background: '#0d1117',
    }}>
      {/* Dark */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ color: '#64748b', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginLeft: 2 }}>Dark</span>
        <div style={{
          position: 'relative', borderRadius: 28, overflow: 'hidden', padding: 10,
          background: 'linear-gradient(135deg, #060c18 0%, #0e1428 45%, #10082a 100%)',
          boxShadow: '18px 22px 56px rgba(0,0,0,0.70), -8px -8px 24px rgba(80,70,160,0.18)',
        }}>
          <div style={{ position: 'absolute', top: -56, right: -16, width: 240, height: 240, borderRadius: '50%', filter: 'blur(80px)', opacity: 0.25, background: 'radial-gradient(circle, #c084fc, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: 32, width: 190, height: 190, borderRadius: '50%', filter: 'blur(70px)', opacity: 0.20, background: 'radial-gradient(circle, #60a5fa, transparent 70%)', pointerEvents: 'none' }} />
          <Card dark={true} />
        </div>
      </div>

      {/* Light */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ color: '#94a3b8', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginLeft: 2 }}>Light</span>
        <div style={{
          position: 'relative', borderRadius: 28, overflow: 'hidden', padding: 10,
          background: 'linear-gradient(135deg, #22d3f5 0%, #818cf8 48%, #c084fc 100%)',
          boxShadow: '18px 22px 56px rgba(50,20,140,0.38), -10px -10px 28px rgba(255,255,255,0.55)',
        }}>
          <div style={{ position: 'absolute', top: -40, right: 16, width: 210, height: 210, borderRadius: '50%', filter: 'blur(60px)', opacity: 0.50, background: 'radial-gradient(circle, #ffffff, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -32, left: 16, width: 160, height: 160, borderRadius: '50%', filter: 'blur(50px)', opacity: 0.40, background: 'radial-gradient(circle, #e0f2fe, transparent 70%)', pointerEvents: 'none' }} />
          <Card dark={false} />
        </div>
      </div>
    </div>
  );
}
