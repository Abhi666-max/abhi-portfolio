"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    
    // Simulate loading
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 1;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);
        
        // Wait a bit at 100% before removing preloader
        setTimeout(() => {
          setIsLoaded(true);
        }, 800);
      } else {
        setProgress(currentProgress);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-screen bg-[#111111] z-[999] flex flex-col items-center justify-center text-[#e6e6e6]"
        >
          <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <h1 
              className="text-8xl md:text-[12vw] font-bold tracking-tighter uppercase mb-4"
              style={{ fontFamily: 'var(--font-syncopate)' }}
            >
              {progress}%
            </h1>
            <div className="h-[2px] bg-[#e6e6e6]/20 w-64 md:w-96 overflow-hidden">
              <motion.div 
                className="h-full bg-[#ff3333]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <p className="mt-6 font-mono text-sm tracking-widest uppercase opacity-50">
              Initializing Core Systems
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
