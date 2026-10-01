"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Atmosphere({ soundEnabled }: { soundEnabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const rustleRef = useRef<HTMLAudioElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle Mashaal Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle Audio & Scroll Rustle
  useEffect(() => {
    if (audioRef.current && soundEnabled) {
      audioRef.current.volume = 0.2; 
      audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
    }

    let isScrolling: any;
    const handleScroll = () => {
      if (soundEnabled && rustleRef.current) {
        if (rustleRef.current.paused) {
          rustleRef.current.volume = 0.4;
          rustleRef.current.play().catch(e => {});
        }
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          rustleRef.current?.pause();
        }, 150);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(isScrolling);
    };
  }, [soundEnabled]);

  // Handle Canvas Embers (Chingari)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      life: number;
      maxLife: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = -(Math.random() * 2 + 1);
        this.maxLife = Math.random() * 100 + 50;
        this.life = this.maxLife;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.speedX += (Math.random() - 0.5) * 0.1;
      }

      draw() {
        if (!ctx) return;
        const opacity = (this.life / this.maxLife) * 0.8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 103, 31, ${opacity})`; 
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ff671f';
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 40; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.life <= 0 || p.y < 0) {
          particles.splice(index, 1);
          particles.push(new Particle());
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* The Mashaal (Torch) Glow following the cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-[30] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,103,31,0.08) 0%, rgba(139,37,0,0.02) 40%, transparent 70%)',
          mixBlendMode: 'color-burn',
          marginLeft: '-300px',
          marginTop: '-300px'
        }}
        animate={{
          x: mousePos.x,
          y: mousePos.y
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.1 }}
      />

      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-[40]"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Background War Drums */}
      <audio 
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/audio/2022/11/24/audio_3d1000639d.mp3" 
      />

      {/* Paper Rustle for scrolling */}
      <audio 
        ref={rustleRef}
        loop
        src="https://cdn.pixabay.com/audio/2022/03/15/audio_73229bbf93.mp3" 
      />
    </>
  );
}
