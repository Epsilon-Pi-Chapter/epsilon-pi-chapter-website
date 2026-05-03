import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import photo1 from '@ep-assets/line-photos/spring-2026-1.png';
import photo2 from '@ep-assets/line-photos/spring-2026-2.png';
import photo3 from '@ep-assets/line-photos/spring-2026-3.png';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3000),
      setTimeout(() => setPhase(4), 6000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 bg-black flex flex-col pt-[15vh] px-[8vw]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-[8vw] font-display text-primary leading-none uppercase"
        initial={{ opacity: 0, x: -30 }}
        animate={phase >= 1 ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Our Lineage
      </motion.h2>
      <motion.div
        className="w-[20vw] h-[2px] bg-secondary mt-6"
        initial={{ scaleX: 0 }}
        animate={phase >= 1 ? { scaleX: 1 } : {}}
        style={{ originX: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <div className="relative flex-1 mt-[8vh]">
        <motion.img
          src={photo1}
          className="absolute top-0 right-0 w-[65vw] h-[35vh] object-cover rounded-lg border border-primary/30"
          initial={{ opacity: 0, rotate: 2, y: 50 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.img
          src={photo2}
          className="absolute top-[20vh] left-0 w-[55vw] h-[30vh] object-cover rounded-lg border border-primary/30 z-10 shadow-2xl"
          initial={{ opacity: 0, rotate: -3, y: 50 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        />
        <motion.img
          src={photo3}
          className="absolute bottom-[5vh] right-[5vw] w-[70vw] h-[30vh] object-cover rounded-lg border border-primary/30 z-20 shadow-2xl"
          initial={{ opacity: 0, rotate: 1, y: 50 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        />
      </div>
    </motion.div>
  );
}
