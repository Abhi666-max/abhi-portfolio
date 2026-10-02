"use client";
import { useEffect, useRef } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LandscapeEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Layers
  const layerSun = useRef<HTMLDivElement>(null);
  const layerBack = useRef<HTMLDivElement>(null);
  const layerMid = useRef<HTMLDivElement>(null);
  const layerFront = useRef<HTMLDivElement>(null);
  const textHero = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "100% top",
        scrub: 1, // Smooth scrubbing
      }
    });

    // Move layers at different speeds to create 3D depth
    tl.to(layerSun.current, { y: 300, ease: "none" }, 0)
      .to(textHero.current, { y: 500, scale: 1.2, opacity: 0, ease: "none" }, 0)
      .to(layerBack.current, { y: 200, ease: "none" }, 0)
      .to(layerMid.current, { y: 100, ease: "none" }, 0)
      .to(layerFront.current, { y: 0, ease: "none" }, 0); // Front layer moves the least relative to scroll

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="w-full relative z-10 selection:bg-[#ff7b54] selection:text-white">
      
      {/* 1. HERO PARALLAX SECTION */}
      <section ref={containerRef} className="relative w-full h-[120vh] overflow-hidden" style={{ background: 'linear-gradient(to bottom, var(--sky-top), var(--sky-bottom))' }}>
        
        {/* Sun */}
        <div ref={layerSun} className="absolute top-[20%] left-[50%] -translate-x-1/2 w-96 h-96 sun-glow rounded-full mix-blend-screen" />

        {/* Hero Text */}
        <div ref={textHero} className="absolute top-[30%] w-full text-center z-10 px-4">
          <h1 className="heading text-6xl md:text-8xl lg:text-[9vw] font-bold text-[#fff] drop-shadow-xl tracking-wide">
            {portfolioData.profile.name}
          </h1>
          <p className="text-xl md:text-3xl text-white/90 mt-4 tracking-widest uppercase font-light">
            Creative Developer
          </p>
        </div>

        {/* Birds */}
        <div className="absolute top-[25%] left-[20%] w-12 h-6 bird opacity-60" />
        <div className="absolute top-[20%] left-[70%] w-8 h-4 bird opacity-40 scale-75" />

        {/* Back Mountains (SVG shape via CSS clip-path for sharp vector look) */}
        <div 
          ref={layerBack} 
          className="absolute bottom-[-10vh] w-[200%] -left-[50%] h-[70vh] z-20"
          style={{ 
            backgroundColor: 'var(--mountain-back)',
            clipPath: 'polygon(0% 100%, 0% 50%, 10% 40%, 20% 60%, 30% 30%, 45% 70%, 55% 20%, 70% 65%, 85% 35%, 100% 55%, 100% 100%)'
          }}
        />

        {/* Mid Mountains */}
        <div 
          ref={layerMid} 
          className="absolute bottom-[-10vh] w-[200%] -left-[30%] h-[50vh] z-30"
          style={{ 
            backgroundColor: 'var(--mountain-mid)',
            clipPath: 'polygon(0% 100%, 0% 40%, 15% 20%, 30% 50%, 50% 10%, 65% 60%, 80% 30%, 100% 45%, 100% 100%)'
          }}
        />

        {/* Foreground / Forest Ground */}
        <div 
          ref={layerFront} 
          className="absolute bottom-[-5vh] w-full h-[30vh] z-40"
          style={{ 
            backgroundColor: 'var(--forest-floor)',
            clipPath: 'polygon(0% 100%, 0% 30%, 5% 20%, 15% 35%, 25% 15%, 40% 40%, 60% 10%, 75% 35%, 85% 25%, 100% 40%, 100% 100%)'
          }}
        />
        
        {/* Gradient fade to connect foreground to content */}
        <div className="absolute bottom-[-5vh] w-full h-[15vh] z-50 bg-gradient-to-t from-[var(--forest-floor)] to-transparent" />
      </section>

      {/* 2. MAIN CONTENT (The Forest Floor) */}
      <section className="w-full relative z-50 bg-[var(--forest-floor)] pb-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 -mt-20 relative z-50">
          
          <div className="bg-[#1f1933] p-8 md:p-16 rounded-3xl shadow-2xl border border-white/5 backdrop-blur-sm">
            <h2 className="heading text-4xl md:text-5xl text-[#ffd56b] mb-6">The Journey So Far</h2>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light max-w-3xl">
              Like a trek through an uncharted forest, my career has been a journey of discovery. 
              I build immersive, story-driven digital experiences that leave a lasting impression.
            </p>
          </div>

          {/* Projects Section */}
          <div className="mt-32">
            <h2 className="heading text-5xl md:text-6xl text-[#ff7b54] mb-16 text-center">Milestones</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {portfolioData.projects.map((project, i) => (
                <div key={project.id} className="group relative rounded-2xl overflow-hidden bg-[#2a2344] hover:-translate-y-2 transition-all duration-500 shadow-xl border border-white/5">
                  <div className="w-full h-64 overflow-hidden relative">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2a2344] to-transparent" />
                  </div>
                  <div className="p-8 relative z-10">
                    <span className="text-xs tracking-widest text-[#ffd56b] uppercase mb-2 block font-bold">
                      {project.tags?.[0] || 'Exploration'}
                    </span>
                    <h3 className="heading text-3xl text-white mb-4">{project.title}</h3>
                    <p className="text-white/60 line-clamp-3 leading-relaxed">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
      
      {/* 3. FOOTER */}
      <footer className="w-full bg-[#0d0a14] py-20 border-t border-white/5 text-center">
        <h2 className="heading text-4xl text-[#ff7b54] mb-4">Start a New Adventure</h2>
        <a href="mailto:hello@abhi.com" className="text-xl text-white/80 hover:text-white transition-colors border-b border-white/20 pb-1">
          hello@abhijit.com
        </a>
      </footer>

    </div>
  );
}
