import { motion } from 'framer-motion';
import { PhoneFrame } from '../parts/PhoneFrame';
import { TabBar } from '../parts/TabBar';
import { MobileHeader } from '../parts/MobileHeader';
import { Cursor } from '../parts/Cursor';

const BASE = import.meta.env.BASE_URL;

const OFFICERS = [
  { name: 'Nyles Ferguson', title: '1st Vice President', img: `${BASE}assets/portraits/nyles-ferguson.png` },
  { name: 'Khamani Battiste', title: '2nd Vice President', img: `${BASE}assets/portraits/khamani-battiste.png` },
  { name: 'Joseph Hargett', title: 'Treasurer', img: `${BASE}assets/portraits/joseph-hargett.png` },
  { name: 'Ian Thomas', title: 'Corresponding Secretary', img: `${BASE}assets/portraits/ian-thomas.png` },
  { name: 'Brett Andrews Jr.', title: 'Historian', img: `${BASE}assets/portraits/brett-andrews-jr.png` },
  { name: 'Jaleel Drummond', title: 'Parliamentarian', img: `${BASE}assets/portraits/jaleel-drummond.png` },
];

export function Scene4() {
  return (
    <div className="absolute inset-0">
      <PhoneFrame url="epialphas.com/officers">
        <div className="absolute inset-0 bg-black">
          <MobileHeader title="OFFICERS" />

          <div className="absolute inset-x-0 overflow-hidden" style={{ top: 52, bottom: 64 }}>
            <div className="px-4 pt-3">
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                style={{
                  fontFamily: 'Cinzel, serif',
                  color: '#f0d58f',
                  fontSize: 22,
                  letterSpacing: '0.1em',
                }}
              >
                CHAPTER OFFICERS
              </motion.h2>
              <motion.div
                className="h-[2px] mt-1.5"
                style={{ background: '#c99a2e', transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1.45 }}
              />
              <motion.div
                className="mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.55 }}
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: 9,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                2026 — 2027
              </motion.div>
            </div>

            {/* Mobile-style 2-col card grid */}
            <div className="px-4 pt-3">
              <div className="grid grid-cols-2 gap-2">
                {OFFICERS.map((o, i) => (
                  <motion.div
                    key={o.name}
                    className="rounded-lg overflow-hidden border"
                    style={{ background: '#111', borderColor: 'rgba(201,154,46,0.3)' }}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 1.7 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
                      <img src={o.img} className="w-full h-full object-cover" />
                    </div>
                    <div className="px-2 py-1.5">
                      <div
                        style={{
                          fontFamily: 'Cinzel, serif',
                          color: '#f0d58f',
                          fontSize: 10,
                          letterSpacing: '0.04em',
                          lineHeight: 1.1,
                        }}
                      >
                        {o.name.toUpperCase()}
                      </div>
                      <div
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: 8,
                          letterSpacing: '0.12em',
                          marginTop: 1,
                          textTransform: 'uppercase',
                        }}
                      >
                        {o.title}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <TabBar active="Officers" highlightDelay={1.0} />
        </div>
      </PhoneFrame>

      <Cursor
        waypoints={[
          { x: 50, y: 102 },
          { x: 70, y: 93, tap: true },
          { x: 50, y: 55 },
        ]}
        startDelayMs={150}
        stepMs={900}
      />
    </div>
  );
}
