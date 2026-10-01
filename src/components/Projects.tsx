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
      
      // Elegant Cinematic Mask Reveal (Curtain style)
      gsap.fromTo(maskRefs.current[i],
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          ease: "power3.inOut",
          duration: 2.0,
          scrollTrigger: {
            trigger: maskRefs.current[i],
            start: "top 75%",
          }
        }
      );

      // Deep Parallax Effect
      gsap.fromTo(img, 
        { y: -100, scale: 1.15 },
        {
          y: 100,
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
        
        {/* Chapter Title */}
        <h2 className="text-xs font-sans tracking-[0.4em] uppercase text-[#d4af37] mb-12 text-center md:text-left">
          CHAPTER III &mdash; THE ARCHIVES
        </h2>

        {portfolioData.projects.map((project, i) => (
          <div key={project.id} className="relative w-full flex flex-col md:flex-row gap-16 items-center group">
            
            {/* Cinematic Image Masking */}
            <div 
              ref={el => { maskRefs.current[i] = el; }}
              className="w-full md:w-2/3 h-[60vh] md:h-[80vh] overflow-hidden relative hover-target"
            >
              <a href={project.link} target="_blank" rel="noreferrer" className="block w-full h-full cursor-none">
                <div 
                  ref={el => { imagesRef.current[i] = el; }}
                  className="w-full h-full bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                >
                  {/* Luxury dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50 group-hover:opacity-0 transition-opacity duration-1000" />
                </div>
              </a>
            </div>

            {/* Project Details */}
            <div className="w-full md:w-1/3 flex flex-col gap-8 opacity-80 group-hover:opacity-100 transition-opacity duration-700">
              <h3 className="text-4xl md:text-5xl font-serif text-[#d4af37]" style={{ fontFamily: 'var(--font-playfair)' }}>
                {project.title}
              </h3>
              <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed font-light">
                {project.description}
              </p>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}
