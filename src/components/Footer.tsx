"use client";

import { portfolioData } from '@/data/mockData';
import Magnetic from './Magnetic';

export default function Footer() {
  return (
    <footer className="relative w-full flex flex-col items-center justify-end pb-8 pt-48 bg-black text-white overflow-hidden">
      
      <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col items-center relative z-10">
        
        <div className="text-center mb-24 w-full cursor-none">
          <h2 className="text-[12vw] font-bold uppercase tracking-tighter leading-[0.8] hover-target" style={{ fontFamily: 'var(--font-syncopate)' }}>
            Let's Make
          </h2>
          <h2 className="text-[12vw] font-bold uppercase tracking-tighter text-transparent mt-2 hover-target" style={{ WebkitTextStroke: '1px rgba(255,255,255,1)', fontFamily: 'var(--font-syncopate)', lineHeight: '0.8' }}>
            Something
          </h2>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-sm border-t border-white/20 pt-8">
          
          <div className="flex gap-8 z-20">
            <Magnetic strength={30}>
              <a href={`mailto:${portfolioData.profile.email}`} className="hover-target transition-opacity opacity-70 hover:opacity-100 uppercase tracking-widest p-4 -m-4">
                {portfolioData.profile.email}
              </a>
            </Magnetic>
          </div>

          <div className="flex gap-8 z-20">
            {Object.entries(portfolioData.profile.socials).map(([name, url]) => (
              <Magnetic key={name} strength={40}>
                <a 
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover-target uppercase tracking-widest opacity-40 hover:opacity-100 transition-all p-4 -m-4"
                >
                  {name}
                </a>
              </Magnetic>
            ))}
          </div>

          <div className="opacity-30 uppercase tracking-widest text-xs text-center md:text-right">
            © {new Date().getFullYear()} {portfolioData.profile.name}.
          </div>
        </div>
      </div>
    </footer>
  );
}
