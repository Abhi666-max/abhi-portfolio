"use client";
import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import TrueHistoricEngine from '@/components/TrueHistoricEngine';
import SmoothScroll from '@/components/SmoothScroll';
import Atmosphere from '@/components/Atmosphere';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        
        :root {
          --font-yatra: 'Yatra One', serif;
          --font-crimson: 'Crimson Text', serif;
        }

        /* Royal Maratha Scroll Scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
        }
        ::-webkit-scrollbar-track {
          background: #3b2314; 
        }
        ::-webkit-scrollbar-thumb {
          background: #8b2500; 
          border: 2px solid #3b2314;
        }
      `}</style>

      {/* The entire body background is Ancient Kaagaj (Parchment Paper) */}
      <main 
        className="min-h-screen font-sans selection:bg-[#8b2500] selection:text-[#f4e4bc] relative"
        style={{
          backgroundColor: '#d7c4a1',
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png"), url("https://images.unsplash.com/photo-1594951474026-62153545e825?q=80&w=2000&auto=format&fit=crop")',
          backgroundBlendMode: 'multiply',
          backgroundSize: 'auto, cover',
          backgroundAttachment: 'fixed'
        }}
      >
        <Atmosphere soundEnabled={soundEnabled} />
        {isLoading && <Preloader onComplete={() => { setIsLoading(false); setSoundEnabled(true); }} />}
        
        <SmoothScroll>
          {!isLoading && <TrueHistoricEngine />}
        </SmoothScroll>
      </main>
    </>
  );
}
