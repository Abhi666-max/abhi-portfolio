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
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current) return;

    const sections = gsap.utils.toArray('.project-panel');
    
    // Calculate total width to scroll
    const totalWidth = scrollWrapperRef.current.scrollWidth - window.innerWidth;

    const st = gsap.to(sections, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => `+=${totalWidth}`,
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative w-full h-screen bg-[#030303] z-10 overflow-hidden">
      
      <div className="absolute top-12 left-6 md:left-20 z-20 mix-blend-difference pointer-events-none">
        <h2 className="text-sm font-mono tracking-widest uppercase text-white">
          [03] // Deployed Systems
        </h2>
      </div>

      <div ref={scrollWrapperRef} className="flex h-full w-max">
        {portfolioData.projects.map((project, i) => (
          <div 
            key={project.id} 
            className="project-panel w-screen h-full flex flex-col justify-center items-center p-6 md:p-20 relative"
          >
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12 z-10">
              
              {/* Image Container with Parallax inner image */}
              <div className="w-full md:w-3/5 h-[40vh] md:h-[60vh] relative overflow-hidden group rounded-lg">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
              </div>

              {/* Text Content */}
              <div className="w-full md:w-2/5 flex flex-col items-start justify-center">
                <div className="text-[#88ccff] font-mono text-sm mb-4">
                  0{i + 1} &mdash; {project.category}
                </div>
                <h3 className="text-4xl md:text-6xl font-bold uppercase mb-6" style={{ fontFamily: 'var(--font-syncopate)' }}>
                  {project.title}
                </h3>
                <p className="text-white/60 mb-8 font-light text-lg">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tech.map(t => (
                    <span key={t} className="px-3 py-1 border border-white/20 rounded-full text-xs font-mono uppercase text-white/80">
                      {t}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.link} 
                  className="hover-target group flex items-center gap-4 text-sm font-mono uppercase tracking-widest hover:text-[#88ccff] transition-colors"
                >
                  <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#88ccff] transition-colors">
                    <ExternalLink size={16} />
                  </span>
                  View Project
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
