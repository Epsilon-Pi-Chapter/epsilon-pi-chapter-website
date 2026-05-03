import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import chapterLogo from '@ep-assets/chapter-logo.png';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 3000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.img
        src={chapterLogo}
        alt="Epsilon Pi Logo"
        className="w-[40vw] h-auto object-contain mb-12"
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={phase >= 1 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="overflow-hidden">
        <motion.h1
          className="text-[6vw] font-display text-primary uppercase text-center leading-tight tracking-widest"
          initial={{ y: '100%' }}
          animate={phase >= 2 ? { y: '0%' } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Epsilon Pi
        </motion.h1>
      </div>
      <div className="overflow-hidden mt-4">
        <motion.p
          className="text-[3vw] text-white/70 font-body uppercase tracking-[0.3em]"
          initial={{ y: '-100%', opacity: 0 }}
          animate={phase >= 2 ? { y: '0%', opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Norfolk State University
        </motion.p>
      </div>
    </motion.div>
  );
}
