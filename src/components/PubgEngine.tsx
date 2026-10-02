"use client";
import { useEffect, useRef, useState } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PubgEngine() {
  const blueZoneLeftRef = useRef<HTMLDivElement>(null);
  const blueZoneRightRef = useRef<HTMLDivElement>(null);
  const [alive, setAlive] = useState(100);

  useEffect(() => {
    // Shrink the Blue Zone as you scroll down!
    gsap.to(blueZoneLeftRef.current, {
      x: '0%', // Fully visible at bottom
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    gsap.to(blueZoneRightRef.current, {
      x: '0%', 
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    // Randomly decrease "Alive" count for fun effect
    const interval = setInterval(() => {
      setAlive(prev => (prev > 2 ? prev - Math.floor(Math.random() * 2) : 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full relative z-10">
      
      {/* THE BLUE ZONE */}
      <div ref={blueZoneLeftRef} className="blue-zone-wall blue-zone-left" />
      <div ref={blueZoneRightRef} className="blue-zone-wall blue-zone-right" />

      {/* TACTICAL HUD */}
      <div className="fixed top-6 right-6 z-50 text-right">
        <div className="bg-black/50 border border-white/10 p-2 px-4 backdrop-blur-sm text-[var(--pubg-yellow)]">
          <span className="text-white">ALIVE</span> <span className="text-xl font-bold ml-2">{alive}</span>
        </div>
        <div className="bg-black/50 border border-white/10 p-2 px-4 mt-2 backdrop-blur-sm text-[var(--pubg-red)]">
          <span className="text-white">KILLS</span> <span className="text-xl font-bold ml-2">{portfolioData.projects.length}</span>
        </div>
        <div className="mt-4 text-xs text-white/50">
          PING: {Math.floor(Math.random() * 10) + 15}ms<br/>
          FPS: 144
        </div>
      </div>

      <div className="fixed top-6 left-6 z-50">
        <div className="w-32 h-32 rounded-full border-4 border-white/20 bg-black/50 overflow-hidden relative backdrop-blur-sm">
          {/* Mini map lines */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
             {Array.from({length: 16}).map((_, i) => (
                <div key={i} className="border border-white/10" />
             ))}
          </div>
          {/* Safe zone circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-white/80 border-dashed animate-spin-slow" />
          {/* Player marker */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-[var(--pubg-yellow)] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_var(--pubg-yellow)]" />
        </div>
      </div>


      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-32 min-h-[200vh] relative z-10">
        
        {/* HERO */}
        <div className="h-[80vh] flex flex-col justify-center">
          <h2 className="text-[var(--pubg-yellow)] tracking-[0.5em] text-sm mb-4">MATCH STARTING...</h2>
          <h1 className="heading text-[12vw] md:text-[9vw] leading-[0.85] text-white drop-shadow-[0_10px_0_rgba(0,0,0,1)]">
            {portfolioData.profile.name}
          </h1>
          <div className="mt-8 flex gap-4">
             <div className="bg-[var(--military-green)] border border-[var(--pubg-yellow)] p-4 px-8 transform -skew-x-12">
               <span className="text-[var(--pubg-yellow)] transform skew-x-12 block text-xl">Lvl. 3 Web Developer</span>
             </div>
          </div>
        </div>

        {/* PROJECTS (Supply Crates) */}
        <div className="mt-32">
          <h2 className="heading text-6xl text-white mb-12">Loot Drop (Projects)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {portfolioData.projects.map((project, i) => (
              <div 
                key={project.id} 
                className="airdrop-crate group target-lock cursor-none transition-transform hover:-translate-y-4"
              >
                {/* Red Smoke Emitter */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 shadow-[0_0_20px_red] animate-pulse z-20 group-hover:shadow-[0_0_50px_red]" />
                
                <div className="relative h-64 overflow-hidden mt-12 px-4 z-10">
                  <div 
                    className="absolute inset-4 bg-cover bg-center border-2 border-white/20 filter sepia-[0.5] hue-rotate-[180deg] group-hover:sepia-0 group-hover:hue-rotate-0 transition-all duration-500"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-4 bg-black/40 group-hover:bg-black/0 transition-colors" />
                </div>

                <div className="p-8 relative z-10">
                  <h3 className="heading text-4xl text-white">{project.title}</h3>
                  <p className="text-white/60 mt-2 line-clamp-3">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {(project.tags || []).map(tag => (
                      <span key={tag} className="text-xs bg-black/50 border border-white/20 px-2 py-1 text-white uppercase">
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

      {/* FOOTER (Winner Winner) */}
      <footer className="w-full bg-[#ffb800] py-32 border-t-8 border-white text-center relative z-20 overflow-hidden">
        {/* Sunburst background */}
        <div className="absolute inset-0 opacity-20" style={{ background: 'repeating-conic-gradient(from 0deg, transparent 0deg 15deg, #000 15deg 30deg)' }} />
        
        <div className="relative z-10">
          <h2 className="heading text-[8vw] md:text-8xl text-black drop-shadow-[0_5px_0_white] leading-none mb-4">
            #1/100
          </h2>
          <h1 className="heading text-[6vw] md:text-6xl text-black drop-shadow-[0_5px_0_white] mb-12">
            WINNER WINNER CHICKEN DINNER!
          </h1>
          
          <a href="mailto:hello@abhi.com" className="inline-block bg-black text-[#ffb800] px-12 py-4 heading text-4xl transform -skew-x-12 hover:scale-110 transition-transform target-lock cursor-none">
            <span className="block transform skew-x-12">RETURN TO LOBBY (HIRE ME)</span>
          </a>
        </div>
      </footer>

    </div>
  );
}
