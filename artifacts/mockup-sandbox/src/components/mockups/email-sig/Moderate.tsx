import React from 'react';
import { Mail, Linkedin, Github, Globe, Phone, BookOpen } from 'lucide-react';

const GRADIENT_STYLE = {
  background: 'linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const AWS_GRADIENT_STYLE = {
  background: 'linear-gradient(135deg, #34d399, #60a5fa, #818cf8)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const AVATAR_GRADIENT = {
  background: 'linear-gradient(135deg, #60a5fa, #818cf8, #c084fc)',
};

const SignatureCard = ({ isDark }: { isDark: boolean }) => {
  const bgColor = isDark ? 'bg-[#1c2132]' : 'bg-white';
  const textColor = isDark ? 'text-slate-300' : 'text-slate-600';
  const headingColor = isDark ? 'text-white' : 'text-slate-900';
  const borderColor = isDark ? 'border-slate-700/50' : 'border-slate-200';
  const iconColor = isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-500 hover:text-blue-500';

  return (
    <div className={`p-6 rounded-xl shadow-sm border ${borderColor} ${bgColor} font-sans w-full max-w-[520px]`}>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div 
          className="flex-shrink-0 w-[72px] h-[72px] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md"
          style={AVATAR_GRADIENT}
        >
          SS
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col">
            <h2 className="text-[1.35rem] font-bold m-0 p-0 leading-tight" style={GRADIENT_STYLE}>
              Siddhant K. Sancheti
            </h2>
            <p className={`font-semibold text-[15px] mt-1 mb-0 p-0 ${headingColor}`}>
              Software Development Engineer
            </p>
            <p className={`text-[13px] mt-0.5 mb-3 p-0 ${textColor}`}>
              Full Stack | ML-AI | Cloud
            </p>
          </div>
          
          <div className={`h-[1px] w-full mb-3 ${isDark ? 'bg-slate-700/50' : 'bg-slate-200'}`} />
          
          <div className="flex justify-between items-center gap-4">
            <div className={`text-[13px] ${textColor} space-y-1`}>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold" style={AWS_GRADIENT_STYLE}>@ Amazon Web Services</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>(xxx) xxx-xxxx</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <a href="mailto:siddhantsanchetik@gmail.com" className={`p-1.5 rounded-md transition-colors ${iconColor}`}>
                <Mail size={16} />
              </a>
              <a href="https://linkedin.com/in/siddhant-sancheti" className={`p-1.5 rounded-md transition-colors ${iconColor}`}>
                <Linkedin size={16} />
              </a>
              <a href="https://github.com/sidsanc" className={`p-1.5 rounded-md transition-colors ${iconColor}`}>
                <Github size={16} />
              </a>
              <a href="https://siddhantsancheti.com" className={`p-1.5 rounded-md transition-colors ${iconColor}`}>
                <Globe size={16} />
              </a>
              <a href="#" className={`p-1.5 rounded-md transition-colors ${iconColor}`}>
                <Phone size={16} />
              </a>
              <a href="#" className={`p-1.5 rounded-md transition-colors ${iconColor}`}>
                <BookOpen size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Moderate() {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-8">
      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-7xl justify-center items-center xl:items-start">
        <div className="flex flex-col gap-2 w-full max-w-[520px]">
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wider pl-1">Dark</span>
          <SignatureCard isDark={true} />
        </div>
        <div className="flex flex-col gap-2 w-full max-w-[520px]">
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wider pl-1">Light</span>
          <SignatureCard isDark={false} />
        </div>
      </div>
    </div>
  );
}
