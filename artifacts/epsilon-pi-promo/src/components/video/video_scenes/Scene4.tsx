import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import ictVideo from '@ep-assets/videos/ict-2026-04-28-cain-greaux.mp4';

export function Scene4() {
  const [phase, setPhase] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 7000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 opacity-40">
        <video
          ref={videoRef}
          src={ictVideo}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-[8vw] pb-[15vh]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h2 className="text-[9vw] font-display text-primary uppercase leading-tight mb-4 shadow-black drop-shadow-lg">
            Impact<br/>Through<br/>Action
          </h2>
          <p className="text-[3.5vw] text-white/90 font-body max-w-[80vw]">
            Serving our community. Developing leaders. Achieving excellence.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
