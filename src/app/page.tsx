"use client";
import { useState, useEffect } from 'react';
import AnimePreloader from '@/components/AnimePreloader';
import MangaEngine from '@/components/MangaEngine';

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
    <main>
      {isLoading && <AnimePreloader onComplete={() => setIsLoading(false)} />}
      {!isLoading && <MangaEngine />}
    </main>
  );
}
