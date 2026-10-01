"use client";
import { useRef, useEffect } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current) return;

    const sections = gsap.utils.toArray('.project-panel');
    const totalWidth = scrollWrapperRef.current.scrollWidth - window.innerWidth;

    // Horizontal Scroll Pin
    gsap.to(scrollWrapperRef.current, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => "+=" + totalWidth,
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    // Parallax inside images while scrolling horizontally
    imagesRef.current.forEach((img, i) => {
      if (!img) return;
      gsap.fromTo(img, 
        { x: -100, scale: 1.2 },
        {
          x: 100,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current, // Use the pinned container as the timeline reference
            start: "top top",
            end: () => "+=" + totalWidth,
            scrub: true,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">
      
      <div 
        ref={scrollWrapperRef}
        className="flex h-full w-[400vw] items-center px-[10vw]"
      >
        
        {/* Intro Panel */}
        <div className="project-panel w-[50vw] shrink-0 flex flex-col justify-center pr-20">
          <h2 className="text-6xl font-serif text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            The Archives of <br/><span className="italic text-[#888]">Creation</span>
          </h2>
          <p className="font-sans text-sm tracking-widest uppercase opacity-40">Keep Scrolling &rarr;</p>
        </div>

        {/* Project Panels */}
        {portfolioData.projects.map((project, i) => (
          <div key={project.id} className="project-panel w-[80vw] h-[70vh] shrink-0 flex items-center gap-12 px-10">
            
            {/* Image Mask */}
            <div className="w-2/3 h-full overflow-hidden relative group cursor-none hover-target">
              <a href={project.link} target="_blank" rel="noreferrer" className="block w-full h-full relative overflow-hidden">
                <div 
                  ref={el => { imagesRef.current[i] = el; }}
                  className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:rotate-1 grayscale group-hover:grayscale-0"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                
                {/* Advanced Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
              </a>
            </div>

            {/* Typography */}
            <div className="w-1/3 flex flex-col gap-6">
              <div className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">0{i + 1}</div>
              <h3 className="text-5xl font-serif leading-none" style={{ fontFamily: 'var(--font-playfair)' }}>
                {project.title}
              </h3>
              <p className="font-sans text-sm opacity-60 leading-relaxed mt-4">
                {project.description}
              </p>
            </div>
            
          </div>
        ))}
        
      </div>
    </section>
  );
}
