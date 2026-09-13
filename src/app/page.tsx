"use client";

import { useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import ScrollSkew from '@/components/ScrollSkew';
import VideoBackground from '@/components/VideoBackground';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative w-full bg-black min-h-screen text-white overflow-hidden font-sans">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <VideoBackground />
      
      <ScrollSkew>
        <div id="scroll-container" className="relative z-10 w-full flex flex-col mix-blend-screen">
          <Hero isLoaded={!isLoading} />
          <About />
          <Experience />
          <Projects />
          <Footer />
        </div>
      </ScrollSkew>
    </main>
  );
}
