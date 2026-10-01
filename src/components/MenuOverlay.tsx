"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const links = [
  { label: 'प्रस्तावना', sub: 'The Architect', id: 'intro' },
  { label: 'मोहिमा', sub: 'Campaigns', id: 'experience' },
  { label: 'ऐतिहासिक दस्तऐवज', sub: 'Royal Archives', id: 'projects' },
];

export default function MenuOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1,
        ease: 'power4.inOut',
      });
      gsap.fromTo(linksRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.5 }
      );
    } else {
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0% 0 100% 0)', // Rolls up like a scroll
        duration: 1,
        ease: 'power4.inOut',
      });
    }
  }, [isOpen]);

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex flex-col justify-center px-10 md:px-32 bg-[#d7c4a1]"
      style={{
        clipPath: 'inset(0% 0 100% 0)',
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")',
        backgroundBlendMode: 'multiply'
      }}
    >
      
      {/* Decorative Borders */}
      <div className="absolute inset-8 border-[3px] border-double border-[#8b2500]/30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[80vh] h-[80vh] -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Om_symbol.svg/1024px-Om_symbol.svg.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />

      <div className="flex justify-between items-center absolute top-10 left-10 right-10">
        <div className="w-16 h-16 rounded-full border-4 border-[#8b2500] border-dashed flex items-center justify-center text-[#8b2500] font-bold text-2xl" style={{ fontFamily: 'var(--font-yatra)' }}>राज</div>
        <button onClick={onClose} className="text-[#8b2500] hover:text-[#ff671f] cursor-none hover-target transition-colors">
          <span className="font-sans text-xs tracking-[0.4em] uppercase font-bold">Close</span>
        </button>
      </div>

      <div className="flex flex-col gap-12 relative z-10 items-center">
        {links.map((link, i) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            ref={el => linksRef.current[i] = el}
            onClick={onClose}
            className="flex flex-col items-center group cursor-none hover-target"
          >
            <span className="text-5xl md:text-7xl text-[#8b2500] group-hover:text-[#ff671f] transition-colors duration-500 mb-2" style={{ fontFamily: 'var(--font-yatra)' }}>
              {link.label}
            </span>
            <span className="font-sans text-xs tracking-[0.5em] uppercase text-[#3b2314] opacity-70 group-hover:opacity-100 transition-opacity duration-500">
              {link.sub}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
