"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { portfolioData } from '@/data/mockData';
import MenuOverlay from './MenuOverlay';
import Magnetic from './Magnetic';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Hide header on scroll down
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden && !isOpen ? -100 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-[100] pointer-events-none"
      >
        <Magnetic strength={20}>
          <div className="font-bold text-xl uppercase tracking-widest pointer-events-auto cursor-none hover-target text-white glow-text p-4 -m-4" style={{ fontFamily: 'var(--font-syncopate)' }}>
            {portfolioData.profile.name.split(' ')[0]}©
          </div>
        </Magnetic>
        
        <Magnetic strength={40}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="pointer-events-auto hover-target flex items-center gap-3 group text-white p-4 -m-4"
          >
            <span className="uppercase text-sm tracking-widest font-mono hidden md:block glow-text">
              {isOpen ? 'CLOSE' : 'MENU'}
            </span>
            <div className="relative w-12 h-12 rounded-full border border-[var(--accent)]/50 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:text-black glow-box">
              <div className="flex flex-col gap-[4px]">
                <motion.div 
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5 : 0 }}
                  className="w-4 h-[2px] bg-current transform origin-center transition-all" 
                />
                <motion.div 
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  className="w-4 h-[2px] bg-current transition-all" 
                />
                <motion.div 
                  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5 : 0 }}
                  className="w-4 h-[2px] bg-current transform origin-center transition-all" 
                />
              </div>
            </div>
          </button>
        </Magnetic>
      </motion.header>

      <AnimatePresence>
        {isOpen && <MenuOverlay onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
