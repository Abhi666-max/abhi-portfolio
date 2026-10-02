"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LandscapePreloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, { opacity: 0, duration: 1, ease: "power2.inOut", onComplete });
      }
    });

    tl.fromTo(sunRef.current, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 2, ease: "power3.out" })
      .fromTo(textRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "-=1")
      .to({}, { duration: 0.5 }) // hold
      .to(textRef.current, { opacity: 0, duration: 0.5 })
      .to(sunRef.current, { scale: 50, opacity: 0, duration: 1.5, ease: "power2.in" });

  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(to bottom, var(--sky-top), var(--sky-bottom))' }}>
      <div ref={sunRef} className="absolute sun-glow w-64 h-64 rounded-full mix-blend-screen" />
      <h1 ref={textRef} className="heading text-4xl md:text-6xl text-[var(--mountain-front)] z-10 font-bold tracking-widest uppercase">
        A New Journey
      </h1>
    </div>
  );
}
