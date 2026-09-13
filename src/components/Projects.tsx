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
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current) return;

    // Horizontal Scroll Pinning
    const sections = gsap.utils.toArray('.project-slide');
    const totalWidth = wrapperRef.current.scrollWidth - window.innerWidth;

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => `+=${totalWidth}`,
      }
    });

    // Velocity Skewing
    let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".project-image-inner", "skewX", "deg"),
        clamp = gsap.utils.clamp(-20, 20);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -100);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }
    });
    
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative w-full h-screen overflow-hidden bg-transparent z-10 pointer-events-none">
      <div className="absolute top-12 left-6 md:left-20 pointer-events-auto">
        <h2 className="text-sm font-mono tracking-widest uppercase text-[#ff3333]">
          [03] // Deployed Systems
        </h2>
      </div>

      <div ref={wrapperRef} className="flex h-full w-[300vw] pointer-events-auto">
        {portfolioData.projects.map((project, i) => (
          <div key={project.id} className="project-slide w-[100vw] h-full flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-32">
            
            <div className="w-full md:w-[50%] h-[40vh] md:h-[60vh] relative overflow-hidden border border-[#111111]">
              <div 
                className="project-image-inner absolute -inset-4 bg-cover bg-center"
                style={{ backgroundImage: `url(${project.image})` }}
              />
            </div>

            <div className="w-full md:w-[40%] flex flex-col items-start justify-center text-[#111111]">
              <div className="text-[#ff3333] font-mono text-sm mb-4 font-bold">
                0{i + 1} &mdash; {project.category}
              </div>
              <h3 className="text-5xl md:text-7xl font-bold uppercase mb-6" style={{ fontFamily: 'var(--font-syncopate)' }}>
                {project.title}
              </h3>
              <p className="opacity-80 mb-8 font-mono text-sm max-w-md">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-10 max-w-md">
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
    </section>
  );
}
