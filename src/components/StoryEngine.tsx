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

    // The Master Timeline that scrubs through the entire historic story
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=6000", 
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // SCENE 1: HERO -> ABOUT
    tl.to(heroRef.current, { opacity: 0, y: -100, scale: 0.9, duration: 1 })
      .to(bg1Ref.current, { opacity: 0, scale: 1.1, duration: 1 }, "<")
      .to(bg2Ref.current, { opacity: 1, scale: 1, duration: 1 }, "<")
      .fromTo(aboutRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
      .to({}, { duration: 1 })
      
    // SCENE 2: ABOUT -> PROJECTS
      .to(aboutRef.current, { opacity: 0, y: -100, duration: 1 })
      .to(bg2Ref.current, { opacity: 0, scale: 1.1, duration: 1 }, "<")
      .to(bg3Ref.current, { opacity: 1, scale: 1, duration: 1 }, "<")
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
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#1a0500]">
      
      {/* --- BACKGROUND SCENES --- */}
      {/* BG 1: Majestic Mountain Fort (Sahyadri Vibes) */}
      <div 
        ref={bg1Ref}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1621217743717-3801f4633f81?q=80&w=2000&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a0800]/90 via-[#2a0800]/40 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#ff671f] mix-blend-color opacity-20" /> {/* Saffron Tint */}
      </div>

      {/* BG 2: Ancient Stone / Royal Darbar Architecture */}
      <div 
        ref={bg2Ref}
        className="absolute inset-0 z-0 bg-cover bg-center opacity-0 scale-105"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1582650893072-23c2a11b61c7?q=80&w=2000&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#ff671f]/10 to-[#2a0800]/80" />
      </div>

      {/* BG 3: Epic Saffron Sunset / Battlefield Vibe */}
      <div 
        ref={bg3Ref}
        className="absolute inset-0 z-0 bg-cover bg-center opacity-0 scale-105"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=2000&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#2a0800]/90 to-[#2a0800]/40" />
        <div className="absolute inset-0 bg-[#ff671f] mix-blend-overlay opacity-40" />
      </div>


      {/* --- CONTENT SCENES --- */}
      
      {/* Content 1: Hero */}
      <div ref={heroRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-[10vw] font-serif leading-[0.9] text-[#ffd700] drop-shadow-2xl" style={{ fontFamily: 'var(--font-playfair)', textShadow: '0 4px 20px rgba(255, 103, 31, 0.4)' }}>
          {portfolioData.profile.name}
        </h1>
        <div className="mt-10 font-sans text-sm md:text-base tracking-[0.5em] uppercase text-[#ff671f] font-bold border-b border-[#ff671f]/30 pb-4">
          The Grand Legacy
        </div>
      </div>

      {/* Content 2: About (The Warrior's Path) */}
      <div ref={aboutRef} className="absolute inset-0 z-10 flex flex-col justify-center px-[10vw] opacity-0 translate-y-[100px]">
        <div className="max-w-4xl">
          <h2 className="text-xs md:text-sm font-sans tracking-[0.4em] uppercase text-[#ff671f] font-bold mb-8 border-l-4 border-[#ff671f] pl-4">
            प्रथम खंड &mdash; The Warrior's Path
          </h2>
          <p className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#ffd700] leading-[1.4] drop-shadow-xl" style={{ fontFamily: 'var(--font-playfair)', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            {portfolioData.profile.bio}
          </p>
        </div>
      </div>

      {/* Content 3: Projects (Itihas / Chronicles) */}
      <div ref={projectWrapperRef} className="absolute inset-0 z-10 flex h-full opacity-0 translate-x-full">
        {portfolioData.projects.map((project, i) => (
          <div key={project.id} className="w-[100vw] h-full shrink-0 flex items-center justify-center px-[10vw]">
            <div className="relative w-full max-w-6xl h-[70vh] flex flex-col md:flex-row items-center gap-16 group hover-target cursor-none">
              
              {/* Image with Royal Frame */}
              <div className="w-full md:w-1/2 h-full rounded-sm overflow-hidden relative shadow-2xl border-2 border-[#ff671f]/30">
                <a href={project.link} target="_blank" rel="noreferrer" className="block w-full h-full">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110 sepia-[0.3]"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a0800]/80 via-transparent to-transparent group-hover:opacity-50 transition-opacity duration-700" />
                </a>
              </div>

              {/* Text Content */}
              <div className="w-full md:w-1/2 flex flex-col text-[#ffd700]">
                <span className="font-sans text-xs md:text-sm tracking-[0.4em] uppercase text-[#ff671f] font-bold mb-6">
                  इतिहास &mdash; 0{i + 1}
                </span>
                <h3 className="text-5xl md:text-7xl font-serif mb-8 text-[#ffd700]" style={{ fontFamily: 'var(--font-playfair)', textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>
                  {project.title}
                </h3>
                <p className="font-sans text-lg text-[#ffd700]/80 leading-relaxed font-light mb-8 max-w-lg">
                  {project.description}
                </p>
                <div className="flex gap-4 flex-wrap">
                  {(project.tags || []).map(tag => (
                    <span key={tag} className="text-xs font-sans uppercase tracking-widest px-4 py-2 bg-[#2a0800]/80 border border-[#ff671f]/50 text-[#ff671f]">
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
