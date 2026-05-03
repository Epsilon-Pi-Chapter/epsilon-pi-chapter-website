import { motion } from 'framer-motion';

export function Caption({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.div
      className="absolute left-0 right-0 z-50 flex justify-center"
      style={{ bottom: '7%' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3
        className="font-display uppercase text-center"
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '5.4vw',
          letterSpacing: '0.12em',
          color: '#f0d58f',
          textShadow: '0 2px 24px rgba(0,0,0,0.85), 0 0 18px rgba(201,154,46,0.35)',
        }}
      >
        {text}
      </h3>
    </motion.div>
  );
}
