import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import p1 from '@ep-assets/portraits/adarius-johnson.png';
import p2 from '@ep-assets/portraits/brandon-richardson.png';
import p3 from '@ep-assets/portraits/brett-andrews-jr.png';
import p4 from '@ep-assets/portraits/dylan-bryant.png';

const leaders = [
  { img: p1, name: 'Adarius Johnson', title: 'President' },
  { img: p2, name: 'Brandon Richardson', title: 'Vice President' },
  { img: p3, name: 'Brett Andrews Jr', title: 'Secretary' },
  { img: p4, name: 'Dylan Bryant', title: 'Treasurer' },
];

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 6000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 bg-black flex flex-col justify-center px-[8vw]"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-[8vw] font-display text-primary uppercase text-center mb-[8vh]"
        initial={{ opacity: 0, y: -20 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Leadership
      </motion.h2>

      <div className="grid grid-cols-2 gap-x-[6vw] gap-y-[6vh]">
        {leaders.map((leader, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
          >
            <div className="w-[30vw] h-[30vw] rounded-full overflow-hidden border-2 border-primary/50 mb-4 p-1">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src={leader.img} className="w-full h-full object-cover" />
              </div>
            </div>
            <h3 className="font-display text-[3.5vw] text-white text-center leading-tight mb-1">{leader.name}</h3>
            <p className="font-body text-[2.5vw] text-primary uppercase tracking-wider">{leader.title}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
