import { motion } from 'framer-motion';

const BASE = import.meta.env.BASE_URL;
const LOGO = `${BASE}assets/chapter-logo.png`;
const HAND = `${BASE}assets/hand-sign.png`;

export function Scene6() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        background:
          'radial-gradient(circle at 50% 45%, #f0d58f 0%, #d8b85b 55%, #b88a26 100%)',
      }}
    >
      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 50%, rgba(60,30,0,0.25) 100%)',
        }}
      />

      {/* Hand-sign in top-right corner, faded */}
      <motion.img
        src={HAND}
        alt=""
        className="absolute"
        style={{
          top: '6%',
          right: '6%',
          width: '22%',
          opacity: 0.18,
          filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.25))',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.18, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Logo */}
      <motion.img
        src={LOGO}
        alt="Epsilon Pi"
        className="relative z-10"
        style={{
          width: '52vw',
          maxWidth: 540,
          filter: 'drop-shadow(0 8px 30px rgba(60,30,0,0.45))',
        }}
        initial={{ opacity: 0, scale: 0.92, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Visit line */}
      <motion.div
        className="relative z-10 mt-10 text-center"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          style={{
            fontFamily: 'Manrope, sans-serif',
            color: 'rgba(40,20,0,0.6)',
            fontSize: '2.2vw',
            letterSpacing: '0.4em',
            fontWeight: 600,
          }}
        >
          VISIT
        </div>
        <h2
          className="mt-2"
          style={{
            fontFamily: 'Cinzel, serif',
            color: '#1a0d00',
            fontSize: '7.4vw',
            letterSpacing: '0.12em',
            fontWeight: 800,
          }}
        >
          EPIALPHAS.COM
        </h2>
        <motion.div
          className="mx-auto mt-3"
          style={{ height: 2, background: '#1a0d00', width: '40%' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        />
      </motion.div>

      {/* @epialphas */}
      <motion.div
        className="relative z-10 mt-8 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.25 }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="#1a0d00" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4" stroke="#1a0d00" strokeWidth="1.8" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="#1a0d00" />
        </svg>
        <span
          style={{
            fontFamily: 'Manrope, sans-serif',
            color: '#1a0d00',
            fontSize: '3.2vw',
            letterSpacing: '0.1em',
            fontWeight: 700,
          }}
        >
          @epialphas
        </span>
      </motion.div>
    </motion.div>
  );
}
