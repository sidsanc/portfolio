import { Mail, Linkedin, Github, Globe, Phone, BookOpen } from "lucide-react";

export function Compact() {
  const links = [
    { icon: Mail, href: "mailto:siddhantsanchetik@gmail.com", label: "Email" },
    { icon: Linkedin, href: "https://linkedin.com/in/siddhant-sancheti", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/sidsanc", label: "GitHub" },
    { icon: Globe, href: "https://siddhantsancheti.com", label: "Portfolio" },
    { icon: Phone, href: "tel:xxx-xxx-xxxx", label: "WhatsApp" },
    { icon: BookOpen, href: "https://hashnode.com/@sidsanc", label: "Hashnode" },
  ];

  const gradientText = {
    background: "linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  const gradientBg = {
    background: "linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)",
  };

  const darkGlass = {
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(24px) saturate(180%)",
    WebkitBackdropFilter: "blur(24px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
  };

  const lightGlass = {
    background: "rgba(255, 255, 255, 0.55)",
    backdropFilter: "blur(24px) saturate(180%)",
    WebkitBackdropFilter: "blur(24px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.85)",
    boxShadow: "0 8px 32px rgba(100, 116, 139, 0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
  };

  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-center gap-14 font-['Inter',sans-serif]">

      {/* Dark Version */}
      <div className="flex flex-col gap-3">
        <span className="text-neutral-500 text-xs font-semibold tracking-widest uppercase ml-1">Dark</span>
        <div
          className="relative w-[560px] rounded-3xl overflow-hidden p-8"
          style={{ background: "linear-gradient(135deg, #0d1117 0%, #161b2e 50%, #0f172a 100%)" }}
        >
          {/* Colour orbs */}
          <div className="absolute top-[-40px] left-[-20px] w-48 h-48 rounded-full opacity-25 blur-3xl pointer-events-none"
               style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)" }} />
          <div className="absolute bottom-[-30px] right-[60px] w-36 h-36 rounded-full opacity-20 blur-2xl pointer-events-none"
               style={{ background: "radial-gradient(circle, #60a5fa, transparent 70%)" }} />

          {/* Card */}
          <div style={darkGlass} className="relative rounded-2xl px-5 py-4 flex items-center gap-4">
            <div style={gradientBg} className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-inner">
              SS
            </div>
            <div className="flex flex-col justify-center flex-grow min-w-0">
              <h1 className="text-white font-bold text-base m-0 leading-tight truncate">Siddhant K. Sancheti</h1>
              <div className="flex flex-wrap items-center text-xs gap-x-1.5 leading-tight mt-0.5">
                <span className="font-semibold" style={gradientText}>Software Development Engineer</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-400 font-medium">Amazon Web Services</span>
              </div>
              <div className="text-[10px] text-neutral-600 mt-0.5">(xxx) xxx-xxxx</div>
            </div>
            <div className="w-px h-10 bg-white/10 mx-1 flex-shrink-0" />
            <div className="flex flex-wrap items-center gap-2 w-[76px] justify-center flex-shrink-0">
              {links.map((link, i) => (
                <a key={i} href={link.href} title={link.label}
                   className="text-neutral-500 hover:text-blue-400 transition-colors">
                  <link.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Light Version */}
      <div className="flex flex-col gap-3">
        <span className="text-neutral-400 text-xs font-semibold tracking-widest uppercase ml-1">Light</span>
        <div
          className="relative w-[560px] rounded-3xl overflow-hidden p-8"
          style={{ background: "linear-gradient(135deg, #dde8f8 0%, #e8e4f5 50%, #d8e8f4 100%)" }}
        >
          <div className="absolute top-[-30px] left-[20px] w-40 h-40 rounded-full opacity-30 blur-3xl pointer-events-none"
               style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)" }} />
          <div className="absolute bottom-[-20px] right-[40px] w-28 h-28 rounded-full opacity-25 blur-2xl pointer-events-none"
               style={{ background: "radial-gradient(circle, #60a5fa, transparent 70%)" }} />

          <div style={lightGlass} className="relative rounded-2xl px-5 py-4 flex items-center gap-4">
            <div style={gradientBg} className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              SS
            </div>
            <div className="flex flex-col justify-center flex-grow min-w-0">
              <h1 className="text-neutral-900 font-bold text-base m-0 leading-tight truncate">Siddhant K. Sancheti</h1>
              <div className="flex flex-wrap items-center text-xs gap-x-1.5 leading-tight mt-0.5">
                <span className="font-semibold" style={gradientText}>Software Development Engineer</span>
                <span className="text-neutral-400">·</span>
                <span className="text-neutral-600 font-medium">Amazon Web Services</span>
              </div>
              <div className="text-[10px] text-neutral-400 mt-0.5">(xxx) xxx-xxxx</div>
            </div>
            <div className="w-px h-10 bg-neutral-300 mx-1 flex-shrink-0" />
            <div className="flex flex-wrap items-center gap-2 w-[76px] justify-center flex-shrink-0">
              {links.map((link, i) => (
                <a key={i} href={link.href} title={link.label}
                   className="text-neutral-400 hover:text-blue-500 transition-colors">
                  <link.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
