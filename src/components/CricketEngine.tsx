"use client";
import { useEffect, useRef, useState } from 'react';
import { portfolioData } from '@/data/mockData';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CricketEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Floodlight tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen w-full relative z-10 p-4 md:p-10 pt-20">
      
      {/* Massive Floodlight Effect */}
      <motion.div 
        className="fixed top-0 left-0 w-[800px] h-[800px] pointer-events-none z-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, transparent 70%)',
          marginLeft: '-400px',
          marginTop: '-400px',
          mixBlendMode: 'screen'
        }}
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.1 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HERO SECTION: The Broadcast Graphics */}
        <div className="h-[70vh] flex flex-col justify-center items-start">
          <div className="bg-[#cc2229] text-white px-4 py-1 uppercase font-bold text-xl mb-4" style={{ fontFamily: 'var(--font-sports)' }}>
            LIVE ★ WORLD CUP FINALS
          </div>
          
          <h1 className="text-[12vw] md:text-[8vw] uppercase leading-[0.85] text-white drop-shadow-2xl" style={{ fontFamily: 'var(--font-sports)' }}>
            {portfolioData.profile.name}
          </h1>
          
          <div className="jumbotron mt-8 p-4 px-8 inline-block">
            <h2 className="led-text text-3xl md:text-5xl uppercase">
              ROLE: CREATIVE DEVELOPER
            </h2>
            <div className="led-text text-xl mt-2 text-green-400">
              STATUS: READY TO BAT
            </div>
          </div>
        </div>

        {/* PROJECTS: The Jumbotron LED Board */}
        <div className="mt-32">
          <div className="flex items-center gap-4 mb-12 border-b-4 border-white/20 pb-4">
            <h3 className="text-6xl text-white uppercase" style={{ fontFamily: 'var(--font-sports)' }}>
              Tournament Highlights
            </h3>
            <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse" /> {/* REC dot */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, i) => (
              <div key={project.id} className="jumbotron flex flex-col group cursor-none overflow-hidden h-96">
                
                {/* TV Broadcast overlay */}
                <div className="absolute top-2 left-2 z-20 bg-blue-700 text-white px-2 py-0.5 text-xs font-bold uppercase border border-white/30 shadow-md">
                  REPLAY {i + 1}
                </div>

                <div className="w-full h-1/2 relative overflow-hidden border-b-2 border-[#333]">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-blue-900/30 mix-blend-overlay pointer-events-none" />
                </div>
                
                <div className="p-6 flex-1 flex flex-col bg-[#050a05]">
                  <h4 className="led-text text-2xl uppercase mb-2 line-clamp-1">{project.title}</h4>
                  <p className="led-text text-sm text-[#00ff00] flex-1 line-clamp-3 leading-relaxed">{project.description}</p>
                  
                  <div className="flex gap-2 flex-wrap mt-4">
                    {(project.tags || []).slice(0, 3).map(tag => (
                      <span key={tag} className="led-text text-xs border border-[var(--led-gold)] px-2 py-1 text-[var(--led-gold)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
