"use client";
import { useState, useEffect } from 'react';
import PubgPreloader from '@/components/PubgPreloader';
import PubgEngine from '@/components/PubgEngine';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isLoading]);

  return (
    <main>
      {isLoading && <PubgPreloader onComplete={() => setIsLoading(false)} />}
      {!isLoading && <PubgEngine />}
    </main>
  );
}
