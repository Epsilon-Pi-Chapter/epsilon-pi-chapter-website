import { motion } from 'framer-motion';
import { PhoneFrame } from '../parts/PhoneFrame';
import { TabBar } from '../parts/TabBar';
import { MobileHeader } from '../parts/MobileHeader';
import { Cursor } from '../parts/Cursor';

const AWARDS: { year: string; title: string }[] = [
  { year: '2026', title: 'Charles H. Wesley Award' },
  { year: '2026', title: 'Eastern Region Brother of the Year' },
  { year: '2024', title: 'National Step Show Champions' },
  { year: '2023', title: 'VACAPAF Chapter of the Year' },
  { year: '2022', title: 'VACAPAF Unconditional Service Award' },
  { year: '2021', title: 'NSU Homecoming Stroll of Champions' },
];

export function Scene5() {
  return (
    <div className="absolute inset-0">
      <PhoneFrame url="epialphas.com/awards">
        <div className="absolute inset-0 bg-black">
          <MobileHeader title="AWARDS" />

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
                ACHIEVEMENTS
              </motion.h2>
              <motion.div
                className="h-[2px] mt-1.5"
                style={{ background: '#c99a2e', transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1.45 }}
              />
            </div>

            <div className="px-4 pt-3">
              <div className="space-y-2">
                {AWARDS.map((a, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 rounded-lg px-3 py-2"
                    style={{
                      background: 'rgba(201,154,46,0.08)',
                      border: '1px solid rgba(201,154,46,0.3)',
                    }}
                    initial={{ opacity: 0, x: -28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 1.6 + i * 0.16,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div
                      className="shrink-0 flex items-center justify-center rounded-md"
                      style={{
                        width: 38,
                        height: 38,
                        background: '#c99a2e',
                        color: '#000',
                        fontFamily: 'Cinzel, serif',
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {a.year}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        color: 'rgba(255,255,255,0.92)',
                        fontSize: 11,
                        letterSpacing: '0.04em',
                        lineHeight: 1.25,
                      }}
                    >
                      {a.title}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <TabBar active="Awards" highlightDelay={1.0} />
        </div>
      </PhoneFrame>

      <Cursor
        waypoints={[
          { x: 50, y: 102 },
          { x: 90, y: 93, tap: true },
          { x: 50, y: 55 },
        ]}
        startDelayMs={150}
        stepMs={900}
      />
    </div>
  );
}
