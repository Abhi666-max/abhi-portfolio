"use client";

import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Typewriter } from 'react-simple-typewriter';

// Dynamically import Scene so it only runs on the client (WebGL)
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -1500]);
  
  const opacityHero = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <main id="scroll-container" ref={containerRef} className="relative min-h-[600vh] w-full selection:bg-[#88ccff] selection:text-black">
      
      {/* 3D WebGL Background Scene */}
      <Scene />

      {/* Foreground UI Layer */}
      <div className="relative z-10 w-full">
        {/* Hero Section */}
        <motion.section 
          style={{ opacity: opacityHero }}
          className="relative h-screen w-full flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mix-blend-difference"
          >
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12vw] font-bold leading-[0.8] tracking-tighter uppercase text-outline" style={{ fontFamily: 'var(--font-syncopate)' }}
              >
                SOFTWARE
              </motion.h1>
            </div>
            <div className="overflow-hidden mt-2">
              <motion.h1 
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12vw] font-bold leading-[0.8] tracking-tighter uppercase text-gradient" style={{ fontFamily: 'var(--font-syncopate)' }}
              >
                ENGINEER
              </motion.h1>
            </div>
            
            {/* Hacker Terminal Aesthetic */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 2 }}
              className="mt-12 text-sm md:text-xl font-mono tracking-widest uppercase text-[#88ccff]"
            >
              <span className="text-white/50">{'> '}</span>
              <Typewriter
                words={['Initializing sequence...', 'Rendering 3D Matrix...', 'Scroll to fly through system.']}
                loop={0}
                cursor
                cursorStyle='_'
                typeSpeed={50}
                deleteSpeed={30}
                delaySpeed={2000}
              />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* About Section - Floating Antigravity Elements */}
        <section className="relative h-[150vh] w-full flex flex-col items-center justify-center px-10 md:px-20 pointer-events-none">
          <motion.div 
            style={{ y: y1 }}
            className="max-w-4xl glass-dark p-16 rounded-[2rem] pointer-events-auto group relative overflow-hidden"
          >
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#88ccff]/10 rounded-full blur-[100px] group-hover:bg-[#ff88cc]/10 transition-colors duration-1000 pointer-events-none" />
            
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight" style={{ fontFamily: 'var(--font-syncopate)' }}>
              SYSTEM <span className="italic font-light text-gradient">ARCHITECTURE</span>
            </h2>
            <div className="text-xl md:text-2xl text-white/60 leading-relaxed font-light mb-12 max-w-2xl font-mono space-y-4">
              <p>{'// Specializing in high-performance web systems.'}</p>
              <p>{'// Bridging the gap between engineering and art.'}</p>
              <p>{'// Building the future of digital experiences.'}</p>
            </div>
            <button className="hover-target relative overflow-hidden px-10 py-5 border border-[#88ccff]/30 rounded-full font-mono tracking-widest text-sm transition-all duration-500 group/btn bg-[#88ccff]/5 hover:bg-[#88ccff]/20 text-[#88ccff]">
              <span className="relative z-10 font-bold group-hover/btn:text-shadow-sm transition-all duration-300">EXECUTE /_WORK</span>
            </button>
          </motion.div>
        </section>

        {/* Skills / Visual Section */}
        <section className="relative h-[150vh] w-full flex flex-col items-end justify-center px-10 md:px-32 pointer-events-none">
          <motion.div 
            style={{ y: y2 }}
            className="w-full text-right pointer-events-auto mix-blend-difference"
          >
            <div className="overflow-hidden">
              <h3 className="text-[10vw] font-bold text-outline-subtle cursor-default hover-target leading-[0.8]" style={{ fontFamily: 'var(--font-syncopate)' }}>
                THREE.JS
              </h3>
            </div>
            <div className="overflow-hidden mt-6">
              <h3 className="text-[10vw] font-bold cursor-default hover-target leading-[0.8]" style={{ fontFamily: 'var(--font-syncopate)' }}>
                R3F + DREI
              </h3>
            </div>
            <div className="overflow-hidden mt-6">
              <h3 className="text-[10vw] font-bold text-outline-subtle cursor-default hover-target leading-[0.8]" style={{ fontFamily: 'var(--font-syncopate)' }}>
                WEBGL
              </h3>
            </div>
          </motion.div>
        </section>

        {/* Footer / Outro Section */}
        <section className="relative h-screen w-full flex items-end justify-center pb-12 md:pb-24 pointer-events-none">
          <motion.div 
            style={{ y: y3 }}
            className="text-center pointer-events-auto glass-dark border-[#88ccff]/20 p-12 md:p-20 rounded-[3rem] w-[95vw] max-w-7xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#88ccff]/5 to-transparent pointer-events-none" />
            
            <div className="text-left mb-12 md:mb-0 relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight" style={{ fontFamily: 'var(--font-syncopate)' }}>INIT_COMMS</h2>
              <a href="mailto:hello@example.com" className="font-mono hover-target inline-block mt-6 text-2xl font-light text-[#88ccff]/70 hover:text-[#88ccff] transition-colors duration-300">
                hello@root_system.sh
              </a>
            </div>
            <div className="flex flex-wrap gap-8 md:gap-12 relative z-10 font-mono">
              {['Twitter', 'Awwwards', 'GitHub', 'LinkedIn'].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="hover-target text-sm md:text-base uppercase tracking-[0.2em] text-[#88ccff]/40 hover:text-[#88ccff] transition-colors duration-300 hover:scale-110 transform"
                >
                  [{link}]
                </a>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

    </main>
  );
}
