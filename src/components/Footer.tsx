"use client";

import { portfolioData } from '@/data/mockData';

export default function Footer() {
  return (
    <footer className="relative w-full flex flex-col items-center justify-end pb-8 pt-32 z-10 bg-transparent">
      
      {/* Background glow effect for footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-4xl h-[40vh] bg-blue-500/20 blur-[100px] pointer-events-none rounded-full" />

      <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col items-center relative z-10">
        
        {/* Fixed Typography - No more overflow */}
        <div className="text-center mb-16 w-full">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-white drop-shadow-2xl" style={{ fontFamily: 'var(--font-syncopate)' }}>
            Let's Make
          </h2>
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-transparent mt-2" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)', fontFamily: 'var(--font-syncopate)' }}>
            Something
          </h2>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-10" />

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-sm">
          
          {/* Email */}
          <div className="flex gap-8 z-20">
            <a href={`mailto:${portfolioData.profile.email}`} className="hover-target text-white hover:text-blue-400 transition-colors uppercase tracking-widest font-bold">
              {portfolioData.profile.email}
            </a>
          </div>

          {/* Socials */}
          <div className="flex gap-6 z-20">
            {Object.entries(portfolioData.profile.socials).map(([name, url]) => (
              <a 
                key={name} 
                href={url}
                target="_blank"
                rel="noreferrer"
                className="hover-target uppercase tracking-widest text-white/70 hover:text-white transition-colors"
              >
                {name}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-white/40 uppercase tracking-widest text-xs text-center md:text-right">
            © {new Date().getFullYear()} {portfolioData.profile.name}.
          </div>
        </div>
      </div>
    </footer>
  );
}
