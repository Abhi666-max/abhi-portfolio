"use client";

import { portfolioData } from '@/data/mockData';

export default function Footer() {
  return (
    <footer className="relative w-full flex flex-col items-center justify-end pb-8 pt-32 z-10 bg-transparent">
      
      <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col items-center relative z-10">
        
        <div className="text-center mb-16 w-full">
          <h2 className="text-5xl md:text-8xl lg:text-[10vw] font-bold uppercase tracking-tighter text-[#111111]" style={{ fontFamily: 'var(--font-syncopate)', lineHeight: '0.9' }}>
            Let's Make
          </h2>
          <h2 className="text-5xl md:text-8xl lg:text-[10vw] font-bold uppercase tracking-tighter text-transparent mt-2" style={{ WebkitTextStroke: '2px #111111', fontFamily: 'var(--font-syncopate)', lineHeight: '0.9' }}>
            Something
          </h2>
        </div>

        <div className="w-full h-[1px] bg-[#111111]/20 my-10" />

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-sm text-[#111111]">
          
          <div className="flex gap-8 z-20">
            <a href={`mailto:${portfolioData.profile.email}`} className="hover-target hover:text-[#ff3333] transition-colors uppercase tracking-widest font-bold">
              {portfolioData.profile.email}
            </a>
          </div>

          <div className="flex gap-6 z-20">
            {Object.entries(portfolioData.profile.socials).map(([name, url]) => (
              <a 
                key={name} 
                href={url}
                target="_blank"
                rel="noreferrer"
                className="hover-target uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
              >
                {name}
              </a>
            ))}
          </div>

          <div className="opacity-40 uppercase tracking-widest text-xs text-center md:text-right">
            © {new Date().getFullYear()} {portfolioData.profile.name}.
          </div>
        </div>
      </div>
    </footer>
  );
}
