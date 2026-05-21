import React from 'react';
import { Mail, Linkedin, Github, Globe, Phone, FileText } from 'lucide-react';

export function Bold() {
  const gradientText = {
    background: 'linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const gradientBg = {
    background: 'linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)',
  };

  const darkShadow = {
    boxShadow: '8px 8px 16px rgba(0,0,0,0.4), -4px -4px 8px rgba(255,255,255,0.04)',
  };

  const lightShadow = {
    boxShadow: '8px 8px 16px rgba(163,177,198,0.6), -4px -4px 8px rgba(255,255,255,0.9)',
  };

  const darkPillShadow = {
    boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.4), inset -2px -2px 4px rgba(255,255,255,0.04)',
  };

  const lightPillShadow = {
    boxShadow: 'inset 2px 2px 4px rgba(163,177,198,0.6), inset -2px -2px 4px rgba(255,255,255,0.9)',
  };

  const Card = ({ theme }: { theme: 'dark' | 'light' }) => {
    const isDark = theme === 'dark';
    const bgColor = isDark ? '#1a1f2e' : '#e0e5ec';
    const textColor = isDark ? '#e2e8f0' : '#334155';
    const mutedColor = isDark ? '#94a3b8' : '#64748b';
    const shadow = isDark ? darkShadow : lightShadow;
    const pillShadow = isDark ? darkPillShadow : lightPillShadow;

    return (
      <div 
        style={{ backgroundColor: bgColor, ...shadow }}
        className="w-[560px] rounded-2xl relative overflow-hidden font-sans flex flex-col"
      >
        {/* Top gradient bar */}
        <div style={gradientBg} className="h-1 w-full absolute top-0 left-0" />
        
        <div className="p-6">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 style={gradientText} className="text-2xl font-bold tracking-tight mb-1">
                Siddhant K. Sancheti
              </h1>
              <p style={{ color: textColor }} className="font-medium text-[15px]">
                Software Development Engineer
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span style={{ color: mutedColor }} className="text-sm">
                  Amazon Web Services
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded-sm font-semibold text-white bg-slate-800 tracking-wider">
                  AWS
                </span>
              </div>
              <p style={{ color: mutedColor }} className="text-xs mt-1">
                Full Stack · ML-AI · Cloud
              </p>
            </div>
          </div>

          <div className="h-px w-full mb-4" 
               style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />

          {/* Bottom Section */}
          <div className="flex gap-6">
            {/* Avatar Column */}
            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-[88px] h-[88px] rounded-full p-[3px]"
                style={gradientBg}
              >
                <div 
                  className="w-full h-full rounded-full flex items-center justify-center text-3xl font-bold text-white"
                  style={{ backgroundColor: bgColor }}
                >
                  <span style={gradientText}>SS</span>
                </div>
              </div>
              <p style={{ color: mutedColor }} className="text-xs font-medium">
                (xxx) xxx-xxxx
              </p>
            </div>

            {/* Links Column */}
            <div className="flex-1 grid grid-cols-2 gap-3">
              <a href="mailto:siddhantsanchetik@gmail.com" 
                 className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-transform hover:scale-[1.02]"
                 style={{ color: textColor, ...pillShadow, backgroundColor: isDark ? '#1a1f2e' : '#e0e5ec' }}>
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span className="truncate">Email</span>
              </a>
              <a href="https://linkedin.com/in/siddhant-sancheti" 
                 className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-transform hover:scale-[1.02]"
                 style={{ color: textColor, ...pillShadow, backgroundColor: isDark ? '#1a1f2e' : '#e0e5ec' }}>
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span className="truncate">LinkedIn</span>
              </a>
              <a href="https://github.com/sidsanc" 
                 className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-transform hover:scale-[1.02]"
                 style={{ color: textColor, ...pillShadow, backgroundColor: isDark ? '#1a1f2e' : '#e0e5ec' }}>
                <Github className="w-3.5 h-3.5 text-blue-400" />
                <span className="truncate">GitHub</span>
              </a>
              <a href="https://siddhantsancheti.com" 
                 className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-transform hover:scale-[1.02]"
                 style={{ color: textColor, ...pillShadow, backgroundColor: isDark ? '#1a1f2e' : '#e0e5ec' }}>
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span className="truncate">Portfolio</span>
              </a>
              <a href="tel:xxx-xxx-xxxx" 
                 className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-transform hover:scale-[1.02]"
                 style={{ color: textColor, ...pillShadow, backgroundColor: isDark ? '#1a1f2e' : '#e0e5ec' }}>
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span className="truncate">WhatsApp</span>
              </a>
              <a href="https://hashnode.com/@sidsanc" 
                 className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-transform hover:scale-[1.02]"
                 style={{ color: textColor, ...pillShadow, backgroundColor: isDark ? '#1a1f2e' : '#e0e5ec' }}>
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span className="truncate">Blog</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-100 p-8 font-sans">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8 items-center justify-center">
        <div className="flex gap-8 flex-wrap justify-center items-start">
          <div className="flex flex-col gap-4">
            <h2 className="text-neutral-500 font-semibold text-sm tracking-wider uppercase text-center">Dark</h2>
            <div className="p-8 rounded-3xl bg-[#141824]">
              <Card theme="dark" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-neutral-500 font-semibold text-sm tracking-wider uppercase text-center">Light</h2>
            <div className="p-8 rounded-3xl bg-[#d1d9e6]">
              <Card theme="light" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
