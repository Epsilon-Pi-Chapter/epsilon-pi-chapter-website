import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import chapterLogo from '@ep-assets/chapter-logo.png';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.img
        src={chapterLogo}
        alt="Epsilon Pi Logo"
        className="w-[35vw] h-auto object-contain mb-16"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      <motion.h2
        className="text-[6vw] font-display text-white uppercase tracking-widest text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Visit
      </motion.h2>
      <motion.h1
        className="text-[8vw] font-display text-primary uppercase tracking-widest mt-2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.6 }}
      >
        EpiAlphas.com
      </motion.h1>
    </motion.div>
  );
}
