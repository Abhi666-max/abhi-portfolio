"use client";
import { useState, useEffect } from 'react';
import SpiderPreloader from '@/components/SpiderPreloader';
import SpiderEngine from '@/components/SpiderEngine';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [isLoading]);

  return (
    <main>
      {isLoading && <SpiderPreloader onComplete={() => setIsLoading(false)} />}
      {!isLoading && <SpiderEngine />}
    </main>
  );
}
