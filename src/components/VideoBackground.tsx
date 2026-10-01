"use client";
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function VideoBackground() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;
    // Elegant, slow breathing overlay to give the story a cinematic pulse
    gsap.to(overlayRef.current, {
      opacity: 0.8,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black pointer-events-none">
      {/* 
        Cinematic Dark Flowing Fluid/Smoke Video. 
        It plays silently and infinitely behind the entire story.
      */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-40 mix-blend-screen grayscale"
        style={{ minWidth: '100%', minHeight: '100%' }}
      >
        <source src="https://cdn.pixabay.com/video/2020/03/19/33869-399127885_large.mp4" type="video/mp4" />
      </video>
      
      {/* Deep cinematic gradient overlay to ensure the luxury typography remains perfectly legible */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 opacity-60 mix-blend-multiply" 
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, #000000 90%), linear-gradient(180deg, rgba(20,20,20,0.4) 0%, rgba(0,0,0,0.95) 100%)'
        }}
      />
      
      {/* Subtle film grain noise */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}
      />
    </div>
  );
}
