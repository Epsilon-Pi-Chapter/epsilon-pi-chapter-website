import { motion } from 'framer-motion';
import { PhoneFrame } from '../parts/PhoneFrame';
import { TabBar } from '../parts/TabBar';
import { MobileHeader } from '../parts/MobileHeader';
import { Cursor } from '../parts/Cursor';

const BASE = import.meta.env.BASE_URL;
const PHOTOS = [1, 2, 3, 4].map((n) => `${BASE}assets/line-photos/spring-2026-${n}.png`);

const CARDS = [
  { name: 'Bro. Adarius Johnson', line: '#1 · Spring 2026', major: 'Mass Communications' },
  { name: 'Bro. Brandon Richardson', line: '#2 · Spring 2026', major: 'Computer Science' },
  { name: 'Bro. Brett Andrews Jr.', line: '#3 · Spring 2026', major: 'Political Science' },
];

export function Scene2() {
  return (
    <div className="absolute inset-0">
      <PhoneFrame url="epialphas.com/lineage">
        <div className="absolute inset-0 bg-black">
          <MobileHeader title="LINEAGE" />

          <div
            className="absolute inset-x-0 overflow-hidden"
            style={{ top: 52, bottom: 64 }}
          >
            <motion.div
              className="absolute inset-x-0 top-0 px-4"
              initial={{ y: 0 }}
              animate={{ y: -300 }}
              transition={{ duration: 4.4, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2
                className="mt-4"
                style={{
                  fontFamily: 'Cinzel, serif',
                  color: '#f0d58f',
                  fontSize: 26,
                  letterSpacing: '0.1em',
                  lineHeight: 1.0,
                }}
              >
                OUR LINEAGE
              </h2>
              <div className="h-[2px] mt-2" style={{ background: '#c99a2e' }} />
              <p
                className="mt-2"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                Spring 2026 · The Line
              </p>

              {/* Mobile-style stacked photo cards */}
              <div className="mt-3 space-y-2">
                {PHOTOS.map((src, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl border"
                    style={{
                      borderColor: 'rgba(201,154,46,0.25)',
                      aspectRatio: '16/9',
                    }}
                  >
                    <img src={src} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 pb-6">
                {CARDS.map((c) => (
                  <div
                    key={c.name}
                    className="rounded-lg p-3 flex items-center gap-3"
                    style={{
                      background: 'rgba(201,154,46,0.06)',
                      border: '1px solid rgba(201,154,46,0.25)',
                    }}
                  >
                    <div
                      className="shrink-0 flex items-center justify-center rounded-full"
                      style={{
                        width: 32,
                        height: 32,
                        background: '#c99a2e',
                        color: '#000',
                        fontFamily: 'Cinzel, serif',
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {c.line.match(/#(\d+)/)?.[1]}
                    </div>
                    <div className="min-w-0">
                      <div
                        style={{
                          fontFamily: 'Cinzel, serif',
                          color: '#f0d58f',
                          fontSize: 12,
                          letterSpacing: '0.05em',
                        }}
                      >
                        {c.name}
                      </div>
                      <div
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          color: 'rgba(255,255,255,0.55)',
                          fontSize: 9,
                          marginTop: 1,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {c.major}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <TabBar active="Lineage" highlightDelay={1.4} />
        </div>
      </PhoneFrame>

      {/* Cursor enters from bottom and taps Lineage in bottom nav */}
      <Cursor
        waypoints={[
          { x: 50, y: 102 },
          { x: 30, y: 93, tap: true },
          { x: 50, y: 60 },
        ]}
        startDelayMs={150}
        stepMs={900}
      />
    </div>
  );
}
