"use client";

import { useRef, useEffect } from 'react';
import { portfolioData } from '@/data/mockData';
import { ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const images = gsap.utils.toArray<HTMLElement>('.project-image-inner');
    
    images.forEach((img) => {
      gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative w-full py-32 px-6 md:px-20 z-10 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[#ff3333] mb-20">
          [03] // Deployed Systems
        </h2>

        <div className="flex flex-col gap-32">
          {portfolioData.projects.map((project, i) => (
            <div key={project.id} className="flex flex-col md:flex-row items-center gap-12 group">
              
              <div className="w-full md:w-[60%] h-[50vh] md:h-[70vh] relative overflow-hidden border border-[#111111]">
                <div 
                  className="project-image-inner absolute -inset-[20%] bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-[#e6e6e6]/20 group-hover:bg-transparent transition-colors duration-700" />
              </div>

              <div className="w-full md:w-[40%] flex flex-col items-start justify-center text-[#111111]">
                <div className="text-[#ff3333] font-mono text-sm mb-4 font-bold">
                  0{i + 1} &mdash; {project.category}
                </div>
                <h3 className="text-4xl md:text-5xl font-bold uppercase mb-6" style={{ fontFamily: 'var(--font-syncopate)' }}>
                  {project.title}
                </h3>
                <p className="opacity-80 mb-8 font-mono text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 border border-[#111111] text-xs font-mono uppercase">
                      {t}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.link} 
                  className="hover-target group/btn flex items-center gap-4 text-sm font-mono uppercase tracking-widest hover:text-[#ff3333] transition-colors"
                >
                  <span className="w-10 h-10 rounded-full border border-[#111111] flex items-center justify-center group-hover/btn:border-[#ff3333] transition-colors">
                    <ExternalLink size={16} />
                  </span>
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
