import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PhoneFrame } from '../parts/PhoneFrame';
import { TabBar } from '../parts/TabBar';
import { MobileHeader } from '../parts/MobileHeader';

const LOGO = `${import.meta.env.BASE_URL}assets/chapter-logo.png`;
const FULL_URL = 'epialphas.com';

export function Scene1() {
  const [typed, setTyped] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let i = 0;
    const typeId = setInterval(() => {
      i += 1;
      setTyped(FULL_URL.slice(0, i));
      if (i >= FULL_URL.length) {
        clearInterval(typeId);
        setTimeout(() => setLoaded(true), 350);
      }
    }, 95);
    return () => clearInterval(typeId);
  }, []);

  return (
    <div className="absolute inset-0">
      <PhoneFrame url={typed || ' '} typing={!loaded}>
        {!loaded ? (
          <div className="w-full h-full" />
        ) : (
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MobileHeader />
            <div
              className="absolute inset-x-0 flex flex-col items-center justify-center px-6"
              style={{ top: 52, bottom: 64 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 45%, rgba(201,154,46,0.35) 0%, transparent 60%)',
                }}
              />
              <motion.img
                src={LOGO}
                alt="Epsilon Pi"
                className="relative z-10"
                style={{ width: '60%', filter: 'drop-shadow(0 0 22px rgba(201,154,46,0.6))' }}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.h1
                className="relative z-10 text-center mt-5"
                style={{
                  fontFamily: 'Cinzel, serif',
                  color: '#f0d58f',
                  fontSize: 24,
                  letterSpacing: '0.18em',
                  fontWeight: 700,
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                EPSILON PI
              </motion.h1>
              <motion.p
                className="relative z-10 text-center mt-1"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 9,
                  letterSpacing: '0.32em',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.95 }}
              >
                NORFOLK&nbsp;STATE&nbsp;UNIVERSITY
              </motion.p>
              <motion.div
                className="relative z-10 mt-6 px-5 py-2 rounded-full"
                style={{
                  background: '#c99a2e',
                  color: '#0a0a0a',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  fontWeight: 700,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.15 }}
              >
                EXPLORE THE CHAPTER
              </motion.div>
            </div>
            <TabBar active="Home" highlightDelay={0.2} />
          </motion.div>
        )}
      </PhoneFrame>
    </div>
  );
}
