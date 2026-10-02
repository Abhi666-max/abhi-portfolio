"use client";
import { useEffect, useRef } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LuxuryEngine() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 1. Hero Text Reveal Animation
    gsap.to(titleLinesRef.current, {
      y: 0,
      duration: 1.5,
      stagger: 0.15,
      ease: "power4.out",
      delay: 0.2
    });

    // 2. Parallax & Fade for Projects
    projectRefs.current.forEach((proj) => {
      if (!proj) return;
      const image = proj.querySelector('.parallax-img');
      const text = proj.querySelector('.proj-text');

      // Image Parallax
      gsap.to(image, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: proj,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Text Fade up
      gsap.fromTo(text, 
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: proj,
            start: "top 80%"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="w-full relative z-10 selection:bg-[#f5f5f7] selection:text-[#030303]">
      
      {/* Navigation (Ultra Minimal) */}
      <nav className="fixed top-0 w-full p-8 md:p-12 flex justify-between items-center z-50 mix-blend-difference text-white">
        <div className="text-sans text-xs tracking-[0.2em] uppercase hover-target">Abhijit.</div>
        <div className="text-sans text-xs tracking-[0.2em] uppercase hover-target">Menu</div>
      </nav>

      {/* HERO SECTION */}
      <section ref={heroRef} className="h-screen w-full flex flex-col justify-center px-8 md:px-24">
        <div className="max-w-6xl w-full mx-auto relative">
          
          <div className="mb-8 overflow-hidden">
            <span ref={el => titleLinesRef.current[0] = el} className="reveal-line text-sans text-sm tracking-[0.3em] text-[var(--text-muted)] uppercase">
              Creative Developer & Designer
            </span>
          </div>

          <h1 className="text-serif text-[12vw] md:text-[8vw] leading-[1.1] tracking-tight font-light text-[#f5f5f7]">
            <div className="mask-text"><span ref={el => titleLinesRef.current[1] = el} className="reveal-line">Crafting digital</span></div>
            <div className="mask-text"><span ref={el => titleLinesRef.current[2] = el} className="reveal-line text-[var(--text-muted)] italic">experiences</span></div>
            <div className="mask-text"><span ref={el => titleLinesRef.current[3] = el} className="reveal-line">with precision.</span></div>
          </h1>
          
        </div>
      </section>

      {/* PROJECTS SECTION (Asymmetrical Grid) */}
      <section className="w-full px-8 md:px-24 py-24 border-t border-[var(--border-thin)]">
        <div className="max-w-6xl w-full mx-auto flex flex-col gap-32">
          
          {portfolioData.projects.map((project, i) => {
            const isEven = i % 2 === 0;
            return (
              <div 
                key={project.id} 
                ref={el => projectRefs.current[i] = el}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 hover-target`}
              >
                {/* Image Container (Overflow hidden for parallax) */}
                <div className="w-full md:w-3/5 aspect-[4/5] md:aspect-[3/4] relative overflow-hidden hairline-border bg-[#0a0a0a]">
                  <div 
                    className="parallax-img absolute inset-0 -top-[10%] h-[120%] bg-cover bg-center opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                </div>

                {/* Text Content */}
                <div className="proj-text w-full md:w-2/5 flex flex-col">
                  <span className="text-sans text-xs tracking-[0.2em] text-[var(--text-muted)] mb-6 uppercase">
                    0{i + 1} // {project.tags?.[0] || 'Work'}
                  </span>
                  <h3 className="text-serif text-4xl md:text-5xl font-light mb-8">
                    {project.title}
                  </h3>
                  <p className="text-sans text-[var(--text-muted)] leading-relaxed font-light mb-10 max-w-sm">
                    {project.description}
                  </p>
                  
                  {/* Subtle Interactive Button */}
                  <div className="inline-flex items-center gap-4 group cursor-none">
                    <span className="text-sans text-xs tracking-[0.2em] uppercase">View Project</span>
                    <div className="w-8 h-[1px] bg-[var(--border-thin)] group-hover:w-16 group-hover:bg-[#f5f5f7] transition-all duration-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full px-8 md:px-24 py-32 bg-[#000] border-t border-[var(--border-thin)]">
        <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="text-serif text-6xl md:text-8xl font-light text-[var(--text-muted)] mb-8">Let's talk.</h2>
            <a href="mailto:hello@abhi.com" className="text-sans text-xl md:text-2xl border-b border-[var(--border-thin)] pb-2 hover-target hover:text-[var(--accent)] transition-colors">
              hello@abhijit.com
            </a>
          </div>
          <div className="text-sans text-xs tracking-[0.2em] text-[var(--text-muted)] mt-16 md:mt-0 uppercase">
            © 2026 // Perfection.
          </div>
        </div>
      </footer>

    </div>
  );
}
