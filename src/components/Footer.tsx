"use client";

import { portfolioData } from '@/data/mockData';
import Magnetic from './Magnetic';

export default function Footer() {
  return (
    <footer className="relative w-full flex flex-col items-center justify-end pb-8 pt-32 z-10 bg-transparent overflow-hidden pointer-events-none">
      
      <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col items-center relative z-10 pointer-events-auto">
        
        <div className="text-center mb-16 w-full">
          <h2 className="text-5xl md:text-8xl lg:text-[10vw] font-bold uppercase tracking-tighter text-white cinematic-shadow" style={{ fontFamily: 'var(--font-syncopate)', lineHeight: '0.9' }}>
            Let's Make
          </h2>
          <h2 className="text-5xl md:text-8xl lg:text-[10vw] font-bold uppercase tracking-tighter text-transparent mt-2" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', fontFamily: 'var(--font-syncopate)', lineHeight: '0.9' }}>
            Something
          </h2>
        </div>

        <div className="w-full h-[1px] bg-[var(--accent)]/20 my-10 cinematic-shadow" />

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-sm text-white">
          
          <div className="flex gap-8 z-20">
            <Magnetic strength={30}>
              <a href={`mailto:${portfolioData.profile.email}`} className="hover-target hover:text-[var(--accent)] transition-colors uppercase tracking-widest font-bold p-4 -m-4 cinematic-shadow">
                {portfolioData.profile.email}
              </a>
            </Magnetic>
          </div>

          <div className="flex gap-6 z-20">
            {Object.entries(portfolioData.profile.socials).map(([name, url]) => (
              <Magnetic key={name} strength={40}>
                <a 
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover-target uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all p-4 -m-4 cinematic-shadow"
                >
                  {name}
                </a>
              </Magnetic>
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
