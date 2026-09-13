"use client";

import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    // Parallax effect for images
    imagesRef.current.forEach((img, i) => {
      if (!img) return;
      
      gsap.fromTo(img, 
        { y: -100 },
        {
          y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative w-full py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-32">
        
        <h2 className="text-sm font-mono tracking-widest uppercase opacity-50 mb-12">
          [03] // Selected Work
        </h2>

        {portfolioData.projects.map((project, i) => (
          <div key={project.id} className="relative w-full flex flex-col md:flex-row gap-12 items-center group">
            
            {/* Image Container with Parallax inner */}
            <div className="w-full md:w-2/3 h-[50vh] md:h-[80vh] overflow-hidden relative hover-target">
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
