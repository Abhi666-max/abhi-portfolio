"use client";

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/mockData';
import Magnetic from './Magnetic';

const menuLinks = [
  { name: 'Home', href: '#scroll-container' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
];

export default function MenuOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none lux-border opacity-50" />
      
      <div className="flex flex-col items-center gap-12 z-10">
        <div className="flex flex-col items-center gap-4">
          {menuLinks.map((link, i) => (
            <Magnetic key={link.name} strength={30}>
              <motion.a
                href={link.href}
                onClick={onClose}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="hover-target text-5xl md:text-8xl font-bold uppercase tracking-tighter text-transparent hover:text-white transition-all p-4 -m-4"
                style={{ fontFamily: 'var(--font-syncopate)', WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}
              >
                {link.name}
              </motion.a>
            </Magnetic>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-8 text-[var(--accent)] font-mono text-sm cinematic-shadow"
        >
          {Object.entries(portfolioData.profile.socials).map(([name, url]) => (
            <Magnetic key={name} strength={20}>
              <a href={url} target="_blank" rel="noreferrer" className="hover-target hover:text-white transition-colors p-2 -m-2 uppercase tracking-widest">
                {name}
              </a>
            </Magnetic>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
