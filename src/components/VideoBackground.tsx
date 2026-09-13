"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;
    // Slow breathing overlay effect for extra cinematic feel
    gsap.to(overlayRef.current, {
      opacity: 0.6,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black pointer-events-none">
      {/* 
        Using a cinematic dark dust/smoke video. 
        Fallback is a dark background color.
      */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-40 mix-blend-screen grayscale"
        style={{ minWidth: '100%', minHeight: '100%' }}
      >
        <source src="https://cdn.pixabay.com/video/2020/03/19/33869-399127885_large.mp4" type="video/mp4" />
      </video>
      
      {/* Deep cinematic vignette and color grading overlay (Sand/Gold tint) */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 opacity-40 mix-blend-multiply" 
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, #000000 80%), linear-gradient(180deg, rgba(200,157,112,0.1) 0%, rgba(0,0,0,0.8) 100%)'
        }}
      />
      
      {/* Noise overlay for film grain */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}
      />
    </div>
  );
}
