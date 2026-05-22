import React from 'react';
import { Mail, Linkedin, Github, Globe, Phone, BookOpen } from 'lucide-react';

const GRADIENT_TEXT = {
  background: 'linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const AWS_GRADIENT_TEXT = {
  background: 'linear-gradient(135deg, #34d399, #60a5fa, #818cf8)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const AVATAR_GRADIENT = {
  background: 'linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)',
};

const DARK_GLASS = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)',
};

const LIGHT_GLASS = {
  background: 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(24px) saturate(180%)',
  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.9)',
  boxShadow: '0 8px 32px rgba(100,116,139,0.12), inset 0 1px 0 rgba(255,255,255,0.95)',
};

const Card = ({ isDark }: { isDark: boolean }) => {
  const glass = isDark ? DARK_GLASS : LIGHT_GLASS;
  const headingColor = isDark ? '#f1f5f9' : '#0f172a';
  const mutedColor = isDark ? '#94a3b8' : '#64748b';
  const dividerColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
  const iconHoverClass = isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-400 hover:text-blue-500';

  return (
    <div style={glass} className="rounded-2xl p-5 w-full max-w-[520px]">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-[68px] h-[68px] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md"
             style={AVATAR_GRADIENT}>
          SS
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-[1.25rem] font-bold m-0 p-0 leading-tight" style={GRADIENT_TEXT}>
            Siddhant K. Sancheti
          </h2>
          <p className="font-semibold text-sm mt-0.5 mb-0" style={{ color: headingColor }}>
            Software Development Engineer
          </p>
          <p className="text-xs mt-0.5 mb-3" style={{ color: mutedColor }}>
            Full Stack | ML-AI | Cloud
          </p>

          <div className="h-px w-full mb-3" style={{ backgroundColor: dividerColor }} />

          <div className="flex justify-between items-center gap-4">
            <div className="text-[13px] space-y-1">
              <div className="font-semibold" style={AWS_GRADIENT_TEXT}>@ Amazon Web Services</div>
              <div style={{ color: mutedColor }}>(xxx) xxx-xxxx</div>
            </div>
            <div className="flex items-center gap-1">
              {[
                { icon: Mail, href: "mailto:siddhantsanchetik@gmail.com" },
                { icon: Linkedin, href: "https://linkedin.com/in/siddhant-sancheti" },
                { icon: Github, href: "https://github.com/sidsanc" },
                { icon: Globe, href: "https://siddhantsancheti.com" },
                { icon: Phone, href: "tel:xxx-xxx-xxxx" },
                { icon: BookOpen, href: "https://hashnode.com/@sidsanc" },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} className={`p-1.5 rounded-lg transition-colors ${iconHoverClass}`}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Moderate() {
  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-center gap-12 font-['Inter',sans-serif]">

      {/* Dark */}
      <div className="flex flex-col gap-3">
        <span className="text-neutral-500 text-xs font-semibold tracking-widest uppercase ml-1">Dark</span>
        <div className="relative w-[580px] rounded-3xl overflow-hidden p-8"
             style={{ background: "linear-gradient(135deg, #0d1117 0%, #161b2e 50%, #0f172a 100%)" }}>
          <div className="absolute top-[-50px] right-[-20px] w-52 h-52 rounded-full opacity-20 blur-3xl pointer-events-none"
               style={{ background: "radial-gradient(circle, #c084fc, transparent 70%)" }} />
          <div className="absolute bottom-[-30px] left-[30px] w-40 h-40 rounded-full opacity-15 blur-3xl pointer-events-none"
               style={{ background: "radial-gradient(circle, #60a5fa, transparent 70%)" }} />
          <Card isDark={true} />
        </div>
      </div>

      {/* Light */}
      <div className="flex flex-col gap-3">
        <span className="text-neutral-400 text-xs font-semibold tracking-widest uppercase ml-1">Light</span>
        <div className="relative w-[580px] rounded-3xl overflow-hidden p-8"
             style={{ background: "linear-gradient(135deg, #dde8f8 0%, #ede8f8 50%, #d8eef8 100%)" }}>
          <div className="absolute top-[-40px] right-[10px] w-48 h-48 rounded-full opacity-30 blur-3xl pointer-events-none"
               style={{ background: "radial-gradient(circle, #c084fc, transparent 70%)" }} />
          <div className="absolute bottom-[-20px] left-[20px] w-36 h-36 rounded-full opacity-25 blur-2xl pointer-events-none"
               style={{ background: "radial-gradient(circle, #60a5fa, transparent 70%)" }} />
          <Card isDark={false} />
        </div>
      </div>
    </div>
  );
}
