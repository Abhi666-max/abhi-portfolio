"use client";
import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import HeroZoom from '@/components/HeroZoom';
import HorizontalProjects from '@/components/HorizontalProjects';
import SmoothScroll from '@/components/SmoothScroll';
import MagneticCursor from '@/components/MagneticCursor';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  return (
    <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <MagneticCursor />
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <SmoothScroll>
        <div id="main-content" className="relative z-10 w-full flex flex-col">
          <HeroZoom isLoaded={!isLoading} />
          <HorizontalProjects />
          <Footer />
        </div>
      </SmoothScroll>
    </main>
  );
}
