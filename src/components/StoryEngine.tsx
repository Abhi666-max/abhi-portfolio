"use client";
import { useRef, useEffect } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StoryEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Background Refs
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);
  const bg3Ref = useRef<HTMLDivElement>(null);

  // Content Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // The Master Timeline that scrubs through the entire story
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=6000", // Massive scroll distance for the story
        scrub: 1,
        pin: true, // Pin the whole screen
        anticipatePin: 1
      }
    });

    // SCENE 1: HERO -> ABOUT
    // Fade out Hero Text
    tl.to(heroRef.current, { opacity: 0, y: -100, scale: 0.9, duration: 1 })
      // Crossfade Background 1 to Background 2
      .to(bg1Ref.current, { opacity: 0, scale: 1.1, duration: 1 }, "<")
      .to(bg2Ref.current, { opacity: 1, scale: 1, duration: 1 }, "<")
      // Bring in About Text
      .fromTo(aboutRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
      // Hold About
      .to({}, { duration: 1 })
      
    // SCENE 2: ABOUT -> PROJECTS (Horizontal)
      // Fade out About
      .to(aboutRef.current, { opacity: 0, y: -100, duration: 1 })
      // Crossfade Background 2 to Background 3
      .to(bg2Ref.current, { opacity: 0, scale: 1.1, duration: 1 }, "<")
      .to(bg3Ref.current, { opacity: 1, scale: 1, duration: 1 }, "<")
      // Bring in Projects Wrapper
      .fromTo(projectWrapperRef.current, { opacity: 0, x: window.innerWidth }, { opacity: 1, x: 0, duration: 1 }, "-=0.5");

    // Horizontal Scroll for Projects
    const totalProjectWidth = window.innerWidth * portfolioData.projects.length;
    tl.to(projectWrapperRef.current, {
      x: -totalProjectWidth + window.innerWidth,
      duration: 3,
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#e4dccf]">
      
      {/* --- BACKGROUND SCENES --- */}
      {/* BG 1: Hero (Cinematic Bright Desert/Dune) */}
      <div 
        ref={bg1Ref}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1547333590-571dc38573fc?q=80&w=2000&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#e4dccf]/80 to-transparent mix-blend-overlay" />
      </div>

      {/* BG 2: About (Cinematic Architecture/Marble) */}
      <div 
        ref={bg2Ref}
        className="absolute inset-0 z-0 bg-cover bg-center opacity-0 scale-105"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-black/30" />
        {/* Frosted Glass Overlay for reading text */}
        <div className="absolute inset-0 backdrop-blur-md bg-white/10" />
      </div>

      {/* BG 3: Projects (Cinematic Silk/Flow) */}
      <div 
        ref={bg3Ref}
        className="absolute inset-0 z-0 bg-cover bg-center opacity-0 scale-105"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>


      {/* --- CONTENT SCENES --- */}
      
      {/* Content 1: Hero */}
      <div ref={heroRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-[12vw] font-serif leading-[0.9] text-[#1a1a1a] drop-shadow-2xl" style={{ fontFamily: 'var(--font-playfair)' }}>
          {portfolioData.profile.name}
        </h1>
        <div className="mt-8 font-sans text-sm tracking-[0.5em] uppercase text-[#1a1a1a]/70 border-b border-[#1a1a1a]/30 pb-2">
          {portfolioData.profile.title}
        </div>
      </div>

      {/* Content 2: About */}
      <div ref={aboutRef} className="absolute inset-0 z-10 flex flex-col justify-center px-[10vw] opacity-0 translate-y-[100px]">
        <div className="max-w-4xl">
          <h2 className="text-xs font-sans tracking-[0.4em] uppercase text-white/70 mb-8 border-l-2 border-white pl-4">
            Chapter I &mdash; The Architect
          </h2>
          <p className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.3] drop-shadow-xl" style={{ fontFamily: 'var(--font-playfair)' }}>
            {portfolioData.profile.bio}
          </p>
        </div>
      </div>

      {/* Content 3: Projects (Horizontal Track) */}
      <div ref={projectWrapperRef} className="absolute inset-0 z-10 flex h-full opacity-0 translate-x-full">
        {portfolioData.projects.map((project, i) => (
          <div key={project.id} className="w-[100vw] h-full shrink-0 flex items-center justify-center px-[10vw]">
            <div className="relative w-full max-w-6xl h-[70vh] flex flex-col md:flex-row items-center gap-16 group hover-target cursor-none">
              
              {/* Image with Glassmorphism frame */}
              <div className="w-full md:w-1/2 h-full rounded-2xl overflow-hidden relative shadow-2xl border border-white/20">
                <a href={project.link} target="_blank" rel="noreferrer" className="block w-full h-full">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                </a>
              </div>

              {/* Text Content */}
              <div className="w-full md:w-1/2 flex flex-col text-white">
                <span className="font-sans text-xs tracking-[0.4em] uppercase text-white/50 mb-6">Archive 0{i + 1}</span>
                <h3 className="text-5xl md:text-7xl font-serif mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {project.title}
                </h3>
                <p className="font-sans text-lg text-white/80 leading-relaxed font-light mb-8 max-w-lg">
                  {project.description}
                </p>
                <div className="flex gap-4 flex-wrap">
                  {(project.tags || []).map(tag => (
                    <span key={tag} className="text-xs font-sans uppercase tracking-widest px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
