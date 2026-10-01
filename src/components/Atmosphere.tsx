"use client";
import { useEffect, useRef, useState } from 'react';

export default function Atmosphere({ soundEnabled }: { soundEnabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle Audio
  useEffect(() => {
    if (audioRef.current) {
      if (soundEnabled) {
        audioRef.current.volume = 0.3; // Subtle background volume
        audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
      } else {
        audioRef.current.pause();
      }
    }
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
        // Swaying motion
        this.speedX += (Math.random() - 0.5) * 0.1;
      }

      draw() {
        if (!ctx) return;
        const opacity = (this.life / this.maxLife) * 0.8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 103, 31, ${opacity})`; // Saffron / Fire color
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff671f';
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
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
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-[40]"
        style={{ mixBlendMode: 'screen' }}
      />
      <audio 
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/audio/2022/11/24/audio_3d1000639d.mp3" 
      />
    </>
  );
}
