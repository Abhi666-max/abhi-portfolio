"use client";
import { useState } from 'react';
import MenuOverlay from './MenuOverlay';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 z-[100] mix-blend-multiply flex justify-between items-center pointer-events-none">
        
        <div className="flex items-center gap-4 pointer-events-auto cursor-none group" onClick={() => window.scrollTo(0,0)}>
          <div className="w-12 h-12 rounded-full border-2 border-[#8b2500] border-dashed flex items-center justify-center text-[#8b2500] group-hover:bg-[#8b2500] group-hover:text-[#d7c4a1] transition-all duration-500">
            <span style={{ fontFamily: 'var(--font-yatra)' }} className="text-xl font-bold">अ</span>
          </div>
          <span className="font-sans text-xs tracking-[0.4em] uppercase font-bold text-[#8b2500] hidden md:block">
            The Maratha Empire
          </span>
        </div>

        <button 
          onClick={() => setMenuOpen(true)}
          className="pointer-events-auto cursor-none flex items-center gap-4 hover-target group px-6 py-3 border border-[#8b2500]/50 hover:bg-[#8b2500]/10 transition-colors"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase font-bold text-[#8b2500]">दरबार (Menu)</span>
          <div className="flex flex-col gap-1.5 w-6">
            <div className="h-0.5 w-full bg-[#8b2500]" />
            <div className="h-0.5 w-2/3 bg-[#8b2500] group-hover:w-full transition-all duration-300" />
            <div className="h-0.5 w-1/3 bg-[#8b2500] group-hover:w-full transition-all duration-300" />
          </div>
        </button>

      </header>
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
