"use client";

import { useRef, useEffect } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const maskRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    imagesRef.current.forEach((img, i) => {
      if (!img || !maskRefs.current[i]) return;
      
      // Aggressive Clip-Path Reveal
      gsap.fromTo(maskRefs.current[i],
        { clipPath: 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          ease: "expo.out",
          duration: 1.5,
          scrollTrigger: {
            trigger: maskRefs.current[i],
            start: "top 80%",
          }
        }
      );

      // Deep Parallax effect
      gsap.fromTo(img, 
        { y: -150, scale: 1.2 },
        {
          y: 150,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: maskRefs.current[i],
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative w-full py-32 text-white bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-32 relative z-10">
        
        <h2 className="text-xs font-sans tracking-[0.3em] uppercase text-[#c89d70] mb-12">
          CHAPTER III &mdash; THE ARCHIVES
        </h2>

        {portfolioData.projects.map((project, i) => (
          <div key={project.id} className="relative w-full flex flex-col md:flex-row gap-12 items-center group">
            
            {/* Image Container with Clip Path & Parallax */}
            <div 
              ref={el => { maskRefs.current[i] = el; }}
              className="w-full md:w-2/3 h-[50vh] md:h-[80vh] overflow-hidden relative hover-target"
            >
              <a href={project.link} target="_blank" rel="noreferrer" className="block w-full h-full cursor-none">
                <div 
                  ref={el => { imagesRef.current[i] = el; }}
                  className="absolute -top-[10%] -bottom-[10%] left-0 right-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </a>
            </div>

            {/* Typography */}
            <div className="w-full md:w-1/3 flex flex-col justify-center">
              <span className="font-mono text-xs tracking-widest opacity-50 mb-4 block">
                0{i + 1} &mdash; {project.category}
              </span>
              
              <h3 className="text-4xl md:text-6xl font-bold uppercase mb-8" style={{ fontFamily: 'var(--font-syncopate)' }}>
                {project.title}
              </h3>
              
              <p className="font-mono text-sm opacity-70 leading-relaxed mb-8">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-12">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 border border-white/20 text-xs font-mono uppercase rounded-full">
                    {t}
                  </span>
                ))}
              </div>

              <a 
                href={project.link} 
                className="hover-target inline-flex items-center gap-4 text-xs font-mono uppercase tracking-widest group/btn"
              >
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-colors">
                  <ExternalLink size={14} />
                </span>
                Launch Project
              </a>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
