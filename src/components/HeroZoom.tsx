"use client";
import { useRef, useEffect } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroZoom({ isLoaded }: { isLoaded: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const oLetterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isLoaded || !containerRef.current || !textContainerRef.current || !oLetterRef.current) return;

    // Entry animation
    gsap.fromTo(textContainerRef.current.children, 
      { y: 200, opacity: 0, rotationX: 45 },
      { y: 0, opacity: 1, rotationX: 0, duration: 2, stagger: 0.1, ease: "power4.out" }
    );

    // The Infinite Zoom (Passing through the O)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000", // Massive scroll distance for the zoom
        scrub: 1,
        pin: true,
      }
    });

    tl.to(textContainerRef.current, {
      scale: 150, // Scale up infinitely
      xPercent: -45, // Adjust to center the 'O' exactly on camera
      yPercent: 10,
      ease: "power1.inOut"
    })
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.1
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoaded]);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center">
      
      {/* Background Grid for depth perspective */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div ref={textContainerRef} className="relative z-10 flex text-[15vw] font-bold uppercase leading-none tracking-tighter" style={{ fontFamily: 'var(--font-syncopate)' }}>
        <span>P</span>
        <span>R</span>
        {/* The 'O' is what we zoom through */}
        <span ref={oLetterRef} className="relative inline-block text-transparent" style={{ WebkitTextStroke: '2px #ffffff' }}>
          O
        </span>
        <span>J</span>
        <span>E</span>
        <span>C</span>
        <span>T</span>
        <span>S</span>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-sans text-xs tracking-[0.5em] uppercase opacity-50">
        Scroll to enter
      </div>
    </section>
  );
}
