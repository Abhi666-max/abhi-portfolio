"use client";
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollSpear() {
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="fixed right-8 top-32 bottom-32 w-1 bg-[#8b2500]/10 z-[100] rounded-full hidden md:block pointer-events-none">
      <motion.div 
        className="w-full bg-gradient-to-b from-[#8b2500] to-[#ff671f] relative"
        style={{ height }}
      >
        {/* Spear Tip (Bhaala) */}
        <div 
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-8 bg-[#ff671f]" 
          style={{ 
            clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
            filter: 'drop-shadow(0px 5px 10px rgba(255,103,31,0.8))' 
          }} 
        />
        {/* Glowing Ember effect on the spear */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#ff671f] rounded-full blur-md mix-blend-screen opacity-50" />
      </motion.div>
    </div>
  );
}
