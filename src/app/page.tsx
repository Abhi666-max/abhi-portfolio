"use client";
import { useState, useEffect } from 'react';
import CricketPreloader from '@/components/CricketPreloader';
import CricketEngine from '@/components/CricketEngine';

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
      {isLoading && <CricketPreloader onComplete={() => setIsLoading(false)} />}
      {!isLoading && <CricketEngine />}
    </main>
  );
}
