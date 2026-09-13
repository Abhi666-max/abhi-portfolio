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
      <main id="scroll-container" className="relative w-full overflow-hidden bg-transparent selection:bg-[#ff3333] selection:text-[#e6e6e6]">
        
        {/* 3D WebGL Glass Object */}
        <Scene />

        {/* Foreground UI Layer */}
        <div className="relative z-10 w-full">
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
