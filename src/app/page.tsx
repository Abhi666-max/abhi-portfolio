"use client";
import { useState, useEffect } from 'react';
import LuxuryPreloader from '@/components/LuxuryPreloader';
import LuxuryEngine from '@/components/LuxuryEngine';

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
      {isLoading && <LuxuryPreloader onComplete={() => setIsLoading(false)} />}
      {!isLoading && <LuxuryEngine />}
    </main>
  );
}
