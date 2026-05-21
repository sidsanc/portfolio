import { Mail, Linkedin, Github, Globe, Phone, BookOpen } from "lucide-react";

export function Compact() {
  const links = [
    { icon: Mail, href: "mailto:siddhantsanchetik@gmail.com", label: "Email" },
    { icon: Linkedin, href: "https://linkedin.com/in/siddhant-sancheti", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/sidsanc", label: "GitHub" },
    { icon: Globe, href: "https://siddhantsancheti.com", label: "Portfolio" },
    { icon: Phone, href: "tel:xxx-xxx-xxxx", label: "WhatsApp" },
    { icon: BookOpen, href: "https://hashnode.com", label: "Hashnode" },
  ];

  const gradientText = {
    background: "linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const gradientBg = {
    background: "linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)",
  };

  return (
    <div className="min-h-screen bg-neutral-950 p-8 flex flex-col items-center justify-center gap-12 font-['Inter',sans-serif]">
      {/* Dark Version */}
      <div className="flex flex-col gap-2">
        <span className="text-neutral-400 text-sm font-medium ml-1">Dark</span>
        <div
          style={{ backgroundColor: "hsl(225, 20%, 13%)" }}
          className="w-[520px] rounded-xl p-4 shadow-xl border border-white/5 flex items-center gap-4"
        >
          {/* Avatar */}
          <div
            style={gradientBg}
            className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-inner"
          >
            SS
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center flex-grow min-w-0">
            <div className="flex items-baseline gap-2">
              <h1 className="text-white font-bold text-base m-0 leading-tight truncate">
                Siddhant K. Sancheti
              </h1>
            </div>
            <div className="flex flex-wrap items-center text-xs text-neutral-400 gap-x-2 leading-tight mt-0.5">
              <span className="font-medium" style={gradientText}>
                Software Development Engineer
              </span>
              <span>@</span>
              <span className="font-semibold text-neutral-300">
                Amazon Web Services
              </span>
            </div>
            <div className="text-[10px] text-neutral-500 mt-1">
              (xxx) xxx-xxxx
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-10 bg-white/10 mx-2" />

          {/* Icons */}
          <div className="flex flex-wrap items-center gap-2 w-[80px] justify-center">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-neutral-400 hover:text-[#60a5fa] transition-colors"
                title={link.label}
              >
                <link.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Light Version */}
      <div className="flex flex-col gap-2">
        <span className="text-neutral-400 text-sm font-medium ml-1">Light</span>
        <div className="w-[520px] rounded-xl p-4 shadow-sm border border-neutral-200 bg-[#fafafa] flex items-center gap-4">
          {/* Avatar */}
          <div
            style={gradientBg}
            className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-sm"
          >
            SS
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center flex-grow min-w-0">
            <div className="flex items-baseline gap-2">
              <h1 className="text-neutral-900 font-bold text-base m-0 leading-tight truncate">
                Siddhant K. Sancheti
              </h1>
            </div>
            <div className="flex flex-wrap items-center text-xs text-neutral-500 gap-x-2 leading-tight mt-0.5">
              <span className="font-bold" style={gradientText}>
                Software Development Engineer
              </span>
              <span>@</span>
              <span className="font-bold text-neutral-700">
                Amazon Web Services
              </span>
            </div>
            <div className="text-[10px] text-neutral-400 mt-1">
              (xxx) xxx-xxxx
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-10 bg-neutral-200 mx-2" />

          {/* Icons */}
          <div className="flex flex-wrap items-center gap-2 w-[80px] justify-center">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-neutral-400 hover:text-[#60a5fa] transition-colors"
                title={link.label}
              >
                <link.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
