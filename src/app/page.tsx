"use client";

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

// Dynamically import Scene so it only runs on the client (WebGL)
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function Home() {
  return (
    <main id="scroll-container" className="relative w-full overflow-hidden bg-transparent">
      
      {/* 3D WebGL Background Scene */}
      <Scene />

      {/* Foreground UI Layer */}
      <div className="relative z-10 w-full">
        
        {/* All Sections */}
        <Hero />
        <About />
        <Experience />
        <Projects />
        
        {/* Footer */}
        <Footer />
        
      </div>
    </main>
  );
}
