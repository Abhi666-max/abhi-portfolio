"use client";
import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import SmoothScroll from '@/components/SmoothScroll';
import Footer from '@/components/Footer';

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
    <main className="bg-[#0a0a0a] min-h-screen text-[#f5f5f7] font-sans selection:bg-[#d4af37] selection:text-black">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <SmoothScroll>
        <div id="main-content" className="relative w-full flex flex-col">
          <Hero isLoaded={!isLoading} />
          <About />
          <Experience />
          <Projects />
          <Footer />
        </div>
      </SmoothScroll>
    </main>
  );
}
