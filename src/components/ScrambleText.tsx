"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const chars = '!<>-_\\\\/[]{}—=+*^?#_';

export default function ScrambleText({ text, className, style }: { text: string, className?: string, style?: any }) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const originalText = text;
    let animationFrame: number;
    
    const scramble = () => {
      let iteration = 0;
      const maxIterations = originalText.length;
      
      const animate = () => {
        if (!textRef.current) return;
        
        textRef.current.innerText = originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
        
        if (iteration >= maxIterations) {
          cancelAnimationFrame(animationFrame);
          return;
        }
        
        iteration += 1 / 3; // Speed of decoding
        animationFrame = requestAnimationFrame(animate);
      };
      
      animate();
    };

    ScrollTrigger.create({
      trigger: textRef.current,
      start: "top 90%",
      onEnter: scramble,
      once: true
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [text]);

  return (
    <span ref={textRef} className={className} style={style}>
      {text}
    </span>
  );
}
