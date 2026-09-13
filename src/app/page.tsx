"use client";

import dynamic from 'next/dynamic';
import Preloader from '@/components/Preloader';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

// Dynamically import Scene so it only runs on the client (WebGL)
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function Home() {
  return (
    <>
      <Preloader />
      <main id="scroll-container" className="relative w-full overflow-hidden bg-transparent selection:bg-[#ff3366] selection:text-white">
        
        {/* 3D WebGL Universe Layer (Behind everything) */}
        <Scene />

        {/* Foreground UI HUD Layer */}
        <div className="relative z-10 w-full pointer-events-none">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Footer />
        </div>
      </main>
    </>
  );
}
