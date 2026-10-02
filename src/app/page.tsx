"use client";
import { useState, useEffect } from 'react';
import LandscapePreloader from '@/components/LandscapePreloader';
import LandscapeEngine from '@/components/LandscapeEngine';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isLoading]);

  return (
    <main>
      {isLoading && <LandscapePreloader onComplete={() => setIsLoading(false)} />}
      {!isLoading && <LandscapeEngine />}
    </main>
  );
}
