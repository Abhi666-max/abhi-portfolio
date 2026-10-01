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
      {/* The Story Curtain Loader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {/* Deep Atmospheric Video */}
      <VideoBackground />
      
      {/* Smooth Elastic Scroll Engine */}
      <ScrollSkew>
        <div id="scroll-container" className="relative z-10 w-full flex flex-col mix-blend-screen">
          
          {/* The Landing */}
          <Hero isLoaded={!isLoading} />
          
          {/* The Chapters */}
          <div className="flex flex-col gap-32 pb-48">
            <About />        {/* Chapter I */}
            <Experience />   {/* Chapter II */}
            <Projects />     {/* Chapter III */}
          </div>
          
          <Footer />
        </div>
      </ScrollSkew>
    </main>
  );
}
