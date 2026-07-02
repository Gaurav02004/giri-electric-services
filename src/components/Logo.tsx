import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
}

export default function Logo({ className = '', iconOnly = false, light = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 shadow-md border border-amber-400/30 overflow-hidden">
        {/* Glow effect */}
        <span className="absolute inset-0 bg-radial from-amber-400/20 to-transparent blur-sm"></span>
        
        {/* Bolt Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5.5 h-5.5 text-amber-400 drop-shadow-[0_2px_8px_rgba(245,166,35,0.6)] z-10"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>

        {/* Small circuit accent dots */}
        <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-blue-400 animate-pulse"></span>
        <span className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-amber-400 animate-ping"></span>
      </div>
      
      {!iconOnly && (
        <div className="flex flex-col">
          <span className={`font-sans font-black tracking-wider text-sm leading-tight uppercase ${light ? 'text-white' : 'text-slate-900'}`}>
            GIRI
            <span className="text-amber-500 ml-1">ELECTRIC</span>
          </span>
          <span className={`font-mono text-[9px] tracking-widest uppercase ${light ? 'text-amber-300' : 'text-slate-500 font-bold'}`}>
            Services & Solutions
          </span>
        </div>
      )}
    </div>
  );
}
