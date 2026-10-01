"use client";
import { useEffect, useRef } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MangaEngine() {
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Stagger reveal panels on scroll
    panelsRef.current.forEach((panel) => {
      if (!panel) return;
      gsap.fromTo(panel, 
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: panel,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto p-4 md:p-10 pt-20 flex flex-col gap-8 relative z-10">
      
      {/* HEADER / HERO - Manga Cover Style */}
      <div 
        ref={el => panelsRef.current[0] = el}
        className="w-full manga-panel min-h-[60vh] flex flex-col md:flex-row items-center p-8 bg-white"
      >
        <div className="speed-lines" />
        
        <div className="w-full md:w-1/2 flex flex-col z-10 relative">
          <span className="bg-[#ff003c] text-white self-start px-4 py-2 font-bold text-xl border-4 border-black mb-4 uppercase" style={{ fontFamily: 'var(--font-anton)' }}>
            Vol. 1
          </span>
          <h1 className="text-[12vw] md:text-[8vw] leading-[0.85] text-black uppercase" style={{ fontFamily: 'var(--font-anton)', textShadow: '4px 4px 0 #ff003c' }}>
            {portfolioData.profile.name}
          </h1>
          <h2 className="text-4xl mt-6 text-black" style={{ fontFamily: 'var(--font-marker)' }}>
            Creative Developer
          </h2>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center mt-10 md:mt-0 relative z-10">
          <div className="speech-bubble w-64 md:w-80">
            <p className="text-xl md:text-2xl font-bold uppercase leading-tight" style={{ fontFamily: 'var(--font-anton)' }}>
              "I build digital experiences that break the internet!"
            </p>
          </div>
        </div>
      </div>

      {/* ABOUT & STATS (Split Panels) */}
      <div className="flex flex-col md:flex-row gap-8 w-full">
        <div ref={el => panelsRef.current[1] = el} className="w-full md:w-2/3 manga-panel p-8 bg-[#ff003c] text-white">
          <div className="absolute top-0 right-0 p-4 text-black text-6xl opacity-20 font-bold" style={{ fontFamily: 'var(--font-anton)' }}>
            物語
          </div>
          <h3 className="text-4xl border-b-4 border-black pb-4 mb-6 uppercase" style={{ fontFamily: 'var(--font-anton)' }}>
            The Story
          </h3>
          <p className="text-xl font-bold leading-relaxed border-4 border-black p-6 bg-white text-black">
            {portfolioData.profile.bio}
          </p>
        </div>

        <div ref={el => panelsRef.current[2] = el} className="w-full md:w-1/3 manga-panel p-8 bg-black text-white flex flex-col justify-center items-center text-center">
          <h3 className="text-3xl text-[#ff003c] mb-8" style={{ fontFamily: 'var(--font-marker)' }}>Level 99</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {['React', 'Next.js', 'Three.js', 'GSAP', 'Tailwind'].map(skill => (
              <span key={skill} className="bg-white text-black font-bold px-4 py-2 border-2 border-[#ff003c]" style={{ fontFamily: 'var(--font-anton)' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECTS (Action Panels) */}
      <h3 className="text-6xl text-center my-10 bg-black text-white py-4 border-y-8 border-[#ff003c] uppercase tracking-widest" style={{ fontFamily: 'var(--font-anton)' }}>
        Missions
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioData.projects.map((project, i) => (
          <div 
            key={project.id}
            ref={el => panelsRef.current[3 + i] = el}
            className="manga-panel flex flex-col group cursor-pointer"
          >
            {/* Project Image with Halftone/Grayscale filter that colors on hover */}
            <div className="w-full h-64 border-b-4 border-black overflow-hidden relative">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute top-2 left-2 bg-[#ff003c] text-white px-3 py-1 font-bold border-2 border-black" style={{ fontFamily: 'var(--font-anton)' }}>
                EP. {i + 1}
              </div>
            </div>
            
            <div className="p-6 bg-white flex-1 flex flex-col">
              <h4 className="text-3xl uppercase mb-4" style={{ fontFamily: 'var(--font-anton)' }}>{project.title}</h4>
              <p className="text-lg font-bold flex-1">{project.description}</p>
              
              <div className="flex gap-2 flex-wrap mt-6 pt-4 border-t-4 border-black border-dashed">
                {(project.tags || []).map(tag => (
                  <span key={tag} className="text-sm font-bold bg-black text-white px-2 py-1">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
