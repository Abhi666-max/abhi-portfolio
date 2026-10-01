"use client";
import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import StoryEngine from '@/components/StoryEngine';
import SmoothScroll from '@/components/SmoothScroll';
import MagneticCursor from '@/components/MagneticCursor';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  return (
    <main className="bg-[#2a0800] min-h-screen text-[#ffd700] font-sans selection:bg-[#ff671f] selection:text-white">
      <MagneticCursor />
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <SmoothScroll>
        {!isLoading && <StoryEngine />}
      </SmoothScroll>
    </main>
  );
}
