"use client";
import { useRef, useEffect } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

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
      
      // Clean, elegant mask reveal
      gsap.fromTo(maskRefs.current[i],
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          ease: "power3.inOut",
          duration: 1.5,
          scrollTrigger: {
            trigger: maskRefs.current[i],
            start: "top 80%",
          }
        }
      );

      // Subtle Parallax
      gsap.fromTo(img, 
        { y: -50, scale: 1.05 },
        {
          y: 50,
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
    <section id="projects" ref={containerRef} className="relative w-full py-40 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        
        <h2 className="text-xs font-sans tracking-[0.3em] uppercase text-[#d4af37] text-center md:text-left">
          03 / Selected Works
        </h2>

        {portfolioData.projects.map((project, i) => (
          <div key={project.id} className="relative w-full flex flex-col md:flex-row gap-16 items-center group">
            
            {/* Image Mask */}
            <div 
              ref={el => { maskRefs.current[i] = el; }}
              className="w-full md:w-3/5 h-[50vh] md:h-[70vh] overflow-hidden relative"
            >
              <a href={project.link} target="_blank" rel="noreferrer" className="block w-full h-full relative overflow-hidden">
                <div 
                  ref={el => { imagesRef.current[i] = el; }}
                  className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                </div>
              </a>
            </div>

            {/* Typography */}
            <div className="w-full md:w-2/5 flex flex-col gap-6">
              <h3 className="text-4xl md:text-5xl font-serif text-[#f5f5f7]" style={{ fontFamily: 'var(--font-playfair)' }}>
                {project.title}
              </h3>
              <p className="font-sans text-sm md:text-base text-[#888] leading-relaxed font-light">
                {project.description}
              </p>
              <div className="flex gap-4 flex-wrap mt-4">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-sans uppercase tracking-widest border border-[#333] px-4 py-2 text-[#d4af37]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}
