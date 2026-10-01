"use client";
import { useRef, useEffect } from 'react';
import { portfolioData } from '@/data/mockData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TrueHistoricEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Background Refs for Parallax Forts/Mavlas
  
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Slowly scale the massive fort background as user scrolls down
    

    // Reveal elements like ink appearing on paper
    elementsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, 
        { opacity: 0, filter: 'blur(10px)', y: 50 },
        {
          opacity: 1, 
          filter: 'blur(0px)', 
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen pt-[30vh] pb-32 overflow-x-hidden">
      
      {/* Background Fort Silhouette (Raigad vibe) */}
      
      
      {/* Gradient fade to make bottom look like endless paper */}
      

      {/* Royal Border (Farman Corners) fixed on screen */}
      <div className="fixed inset-6 border-[3px] border-double border-[#8b2500]/30 z-[50] pointer-events-none rounded-lg" />
      <div className="fixed top-2 left-2 w-16 h-16 border-t-[4px] border-l-[4px] border-[#8b2500] z-[50] pointer-events-none" />
      <div className="fixed top-2 right-2 w-16 h-16 border-t-[4px] border-r-[4px] border-[#8b2500] z-[50] pointer-events-none" />
      <div className="fixed bottom-2 left-2 w-16 h-16 border-b-[4px] border-l-[4px] border-[#8b2500] z-[50] pointer-events-none" />
      <div className="fixed bottom-2 right-2 w-16 h-16 border-b-[4px] border-r-[4px] border-[#8b2500] z-[50] pointer-events-none" />


      {/* MAIN CONTENT (The Scroll) */}
      <div ref={scrollContentRef} className="relative z-10 max-w-5xl mx-auto px-8 md:px-16 flex flex-col gap-40 text-[#3b2314]">
        
        {/* --- TITLE (Shri / Introduction) --- */}
        <div ref={el => elementsRef.current[0] = el} className="flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-8 opacity-70" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Om_symbol.svg/1024px-Om_symbol.svg.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', filter: 'sepia(1) hue-rotate(-50deg) saturate(3) brightness(0.5)' }} />
          <h1 className="text-6xl md:text-[8vw] leading-none mb-6 text-[#8b2500]" style={{ fontFamily: 'var(--font-yatra)' }}>
            {portfolioData.profile.name}
          </h1>
          <p className="text-2xl md:text-3xl italic opacity-80" style={{ fontFamily: 'var(--font-crimson)' }}>
            The Architect of Code • Soldier of the Empire
          </p>
          <div className="w-32 h-[2px] bg-[#8b2500]/50 mt-12" />
        </div>

        {/* --- ABOUT (The Warrior's Path) --- */}
        <div ref={el => elementsRef.current[1] = el} className="flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl text-[#8b2500] mb-12" style={{ fontFamily: 'var(--font-yatra)' }}>
            || प्रथम खंड ||
          </h2>
          <p className="text-xl md:text-3xl leading-relaxed text-[#2c1810]" style={{ fontFamily: 'var(--font-crimson)' }}>
            {portfolioData.profile.bio}
          </p>
        </div>

        {/* --- EXPERIENCE (The Campaigns) --- */}
        <div className="flex flex-col w-full">
          <div ref={el => elementsRef.current[2] = el} className="w-full text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-[#8b2500]" style={{ fontFamily: 'var(--font-yatra)' }}>
              || युद्ध आणि मोहिमा ||
            </h2>
            <p className="text-lg mt-4 opacity-70" style={{ fontFamily: 'var(--font-crimson)' }}>( The Historic Campaigns )</p>
          </div>
          
          <div className="flex flex-col gap-12 relative">
            {/* The vertical timeline line (like an old spear/staff) */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#8b2500]/30 -translate-x-1/2" />
            
            {portfolioData.experience.map((exp, i) => (
              <div 
                key={exp.id} 
                ref={el => elementsRef.current[3 + i] = el}
                className={`relative flex flex-col md:flex-row ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} items-center w-full`}
              >
                {/* Timeline Dot (Shield/Sun symbol) */}
                <div className="absolute left-0 md:left-1/2 w-6 h-6 bg-[#d7c4a1] border-[3px] border-[#8b2500] rounded-full -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(139,37,0,0.5)]" />
                
                <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} py-4`}>
                  <div className="text-[#8b2500] font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-crimson)' }}>{exp.period}</div>
                  <h3 className="text-3xl text-[#2c1810] mb-2" style={{ fontFamily: 'var(--font-yatra)' }}>{exp.role}</h3>
                  <div className="text-xl italic opacity-80" style={{ fontFamily: 'var(--font-crimson)' }}>{exp.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- PROJECTS (The Royal Decrees / Farmans) --- */}
        <div className="flex flex-col w-full pb-32">
          <div ref={el => elementsRef.current[10] = el} className="w-full text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-[#8b2500]" style={{ fontFamily: 'var(--font-yatra)' }}>
              || ऐतिहासिक दस्तऐवज ||
            </h2>
            <p className="text-lg mt-4 opacity-70" style={{ fontFamily: 'var(--font-crimson)' }}>( The Royal Archives )</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {portfolioData.projects.map((project, i) => (
              <div 
                key={project.id}
                ref={el => elementsRef.current[11 + i] = el}
                className="relative p-8 hover-target group"
                style={{
                  // Looks like a torn piece of ancient paper on top of the main paper
                  background: 'rgba(235, 219, 185, 0.7)',
                  boxShadow: '2px 4px 15px rgba(59, 35, 20, 0.2), inset 0 0 20px rgba(139, 37, 0, 0.05)',
                  border: '1px solid rgba(139,37,0,0.2)'
                }}
              >
                {/* Vintage Image Mask */}
                <div className="w-full h-48 md:h-64 mb-8 overflow-hidden relative border-4 border-double border-[#8b2500]/40">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ 
                      backgroundImage: `url(${project.image})`,
                      filter: 'sepia(0.8) contrast(1.2) brightness(0.8)' // Make image look historic
                    }}
                  />
                  <div className="absolute inset-0 bg-[#8b2500] mix-blend-multiply opacity-20" />
                </div>
                
                <h3 className="text-3xl text-[#8b2500] mb-4" style={{ fontFamily: 'var(--font-yatra)' }}>
                  {project.title}
                </h3>
                
                <p className="text-lg leading-relaxed text-[#2c1810]" style={{ fontFamily: 'var(--font-crimson)' }}>
                  {project.description}
                </p>

                <div className="flex gap-3 flex-wrap mt-8">
                  {(project.tags || []).map(tag => (
                    <span key={tag} className="text-sm border border-[#8b2500]/40 px-3 py-1 text-[#8b2500]" style={{ fontFamily: 'var(--font-crimson)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* The Royal Stamp in the corner of the project card */}
                <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full border-2 border-red-800/40 flex items-center justify-center opacity-30 rotate-12">
                  <span className="text-[10px]" style={{ fontFamily: 'var(--font-yatra)', color: 'darkred' }}>मोहर</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
