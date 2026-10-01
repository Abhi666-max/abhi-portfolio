"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ParallaxBackground() {
  const skyRef = useRef<HTMLDivElement>(null);
  const fortRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(skyRef.current, {
      yPercent: 10, 
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom top', scrub: true }
    });
    
    gsap.to(fortRef.current, {
      yPercent: -10, 
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom top', scrub: true }
    });

    gsap.to(foregroundRef.current, {
      yPercent: -20, 
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom top', scrub: true }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#d7c4a1]">
      <div ref={skyRef} className="absolute -top-[10%] left-0 w-full h-[120%] opacity-30 mix-blend-multiply bg-cover bg-top" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=1000&auto=format&fit=crop")' }} />
      <div ref={fortRef} className="absolute top-[20%] left-0 w-full h-[100%] opacity-40 mix-blend-multiply bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1598322692290-7d3d198538d3?q=80&w=1000&auto=format&fit=crop")' }} />
      
      {/* GPU Accelerated Fog */}
      <div className="absolute -inset-[50%] opacity-20 mix-blend-screen animate-fog" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />

      <div ref={foregroundRef} className="absolute -bottom-[20%] left-0 w-full h-[60%] bg-gradient-to-t from-[#3b2314] via-[#8b2500]/20 to-transparent opacity-60" />
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(59,35,20,0.8)]" />
    </div>
  );
}
