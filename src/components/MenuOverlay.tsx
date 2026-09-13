"use client";

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/mockData';

const menuLinks = [
  { name: 'Home', href: '#' },
  { name: 'Work', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function MenuOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
      animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
      exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 w-full h-screen bg-[#050505] z-[90] flex flex-col justify-center px-12 md:px-32"
    >
      {/* Background Noise for Menu */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-5 pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end h-full py-32 relative z-10">
        
        <div className="flex flex-col gap-4 md:gap-8">
          {menuLinks.map((link, index) => (
            <div key={link.name} className="overflow-hidden">
              <motion.a
                href={link.href}
                onClick={onClose}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="text-6xl md:text-8xl font-bold uppercase tracking-tighter hover-target text-white hover:text-[#88ccff] transition-colors duration-500"
                style={{ fontFamily: 'var(--font-syncopate)' }}
              >
                {link.name}
              </motion.a>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-12 mt-12 md:mt-0 text-white/50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <h4 className="text-sm font-mono tracking-widest uppercase mb-4 text-white/30">Socials</h4>
            <div className="flex flex-col gap-2 font-mono">
              {Object.entries(portfolioData.profile.socials).map(([name, url]) => (
                <a key={name} href={url} className="hover-target hover:text-white transition-colors capitalize">
                  {name}
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <h4 className="text-sm font-mono tracking-widest uppercase mb-4 text-white/30">Email</h4>
            <a href={`mailto:${portfolioData.profile.email}`} className="font-mono hover-target hover:text-white transition-colors">
              {portfolioData.profile.email}
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
