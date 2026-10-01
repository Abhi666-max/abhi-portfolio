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
    // Parallax logic based on scroll
    gsap.to(skyRef.current, {
      yPercent: 15, // Moves down slightly
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom top', scrub: true }
    });
    
    gsap.to(fortRef.current, {
      yPercent: -15, // Moves up moderately
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom top', scrub: true }
    });

    gsap.to(foregroundRef.current, {
      yPercent: -40, // Moves up aggressively
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom top', scrub: true }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Base Ancient Paper Color */}
      <div className="absolute inset-0 bg-[#d7c4a1]" />

      {/* Layer 1: Epic Saffron Sky (Moves Down) */}
      <div 
        ref={skyRef} 
        className="absolute -top-[10%] left-0 w-full h-[120%] opacity-30 mix-blend-multiply bg-cover bg-top" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=2000&auto=format&fit=crop")' }} 
      />

      {/* Layer 2: Massive Fort Silhouette (Moves Up) */}
      <div 
        ref={fortRef} 
        className="absolute top-[20%] left-0 w-full h-[100%] opacity-40 mix-blend-multiply bg-cover bg-center" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1598322692290-7d3d198538d3?q=80&w=2000&auto=format&fit=crop")' }} 
      />

      {/* Battlefield Fog / Smoke (Drifts horizontally) */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen" 
        style={{ 
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")', 
          animation: 'drift 60s linear infinite' 
        }} 
      />
      <div 
        className="absolute inset-0 opacity-20 mix-blend-multiply" 
        style={{ 
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-wall.png")', 
          animation: 'driftReverse 80s linear infinite' 
        }} 
      />

      {/* Layer 3: Dark Foreground Rocks (Moves Up Fast) */}
      <div 
        ref={foregroundRef} 
        className="absolute -bottom-[20%] left-0 w-full h-[60%] bg-gradient-to-t from-[#3b2314] via-[#8b2500]/20 to-transparent opacity-60" 
      />
      
      {/* Top Layer: Global Paper Texture to unify everything */}
      <div 
        className="absolute inset-0 opacity-100 mix-blend-multiply" 
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")' }} 
      />
      
      {/* Vignette (Dark Corners like an old scroll) */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(59,35,20,0.9)]" />
    </div>
  );
}
