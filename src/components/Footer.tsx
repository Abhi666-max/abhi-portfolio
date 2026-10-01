"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-[#3b2314] text-[#d7c4a1] py-20 px-6 md:px-20 relative overflow-hidden flex flex-col items-center border-t-8 border-[#8b2500]">
      
      {/* Decorative bg */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-wall.png")' }} />
      
      <div className="w-24 h-24 rounded-full border-2 border-[#d7c4a1] border-dashed flex items-center justify-center text-[#d7c4a1] mb-12 relative z-10">
        <span style={{ fontFamily: 'var(--font-yatra)' }} className="text-4xl font-bold">अ</span>
      </div>

      <h2 className="text-4xl md:text-6xl text-center mb-6 z-10" style={{ fontFamily: 'var(--font-yatra)' }}>
        इतिहास साक्षी आहे
      </h2>
      
      <p className="font-sans text-sm tracking-[0.3em] uppercase opacity-70 mb-16 text-center max-w-lg z-10" style={{ fontFamily: 'var(--font-crimson)' }}>
        The Empire of Abhi — Crafted with the strength of the past, forged for the future.
      </p>

      <div className="w-full max-w-4xl h-[1px] bg-[#d7c4a1]/20 mb-8 z-10" />
      
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center font-sans text-xs tracking-widest uppercase opacity-50 z-10 gap-4">
        <span>© {new Date().getFullYear()} Maratha Empire</span>
        <span>Built by the Architect</span>
      </div>
    </footer>
  );
}
