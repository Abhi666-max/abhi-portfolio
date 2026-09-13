"use client";

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/mockData';

export default function Footer() {
  return (
    <footer className="relative h-screen w-full flex flex-col items-center justify-end pb-12 pt-32 z-10 overflow-hidden bg-[#030303]">
      
      {/* Background glow effect for footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[100vw] h-[50vh] bg-[#88ccff]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="w-full px-6 md:px-20 flex flex-col items-center relative z-10">
        <h2 className="text-[15vw] leading-[0.8] font-bold text-center uppercase tracking-tighter mix-blend-difference text-white" style={{ fontFamily: 'var(--font-syncopate)' }}>
          Let's
          <br />
          <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.3)' }}>Collaborate</span>
        </h2>

        <div className="w-full h-[1px] bg-white/20 my-12" />

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-sm">
          <div className="flex gap-8">
            <a href={`mailto:${portfolioData.profile.email}`} className="hover-target text-[#88ccff] hover:text-white transition-colors uppercase tracking-widest border-b border-[#88ccff]/30 pb-1">
              {portfolioData.profile.email}
            </a>
          </div>

          <div className="flex gap-6">
            {Object.entries(portfolioData.profile.socials).map(([name, url]) => (
              <a 
                key={name} 
                href={url}
                target="_blank"
                rel="noreferrer"
                className="hover-target uppercase tracking-widest text-white/50 hover:text-white transition-colors"
              >
                [{name}]
              </a>
            ))}
          </div>

          <div className="text-white/30 uppercase tracking-widest text-xs">
            © {new Date().getFullYear()} {portfolioData.profile.name}. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
