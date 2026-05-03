import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PhoneFrame } from '../parts/PhoneFrame';
import { TabBar } from '../parts/TabBar';
import { MobileHeader } from '../parts/MobileHeader';
import { Cursor } from '../parts/Cursor';

const BASE = import.meta.env.BASE_URL;
const ICT_VIDEO = `${BASE}assets/videos/ict-2026-04-28-cain-greaux.mp4`;
const ICT_POSTER = `${BASE}assets/videos/ict-2026-04-28-cain-greaux-poster.jpg`;

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const APRIL_OFFSET = 3;
const APRIL_DAYS = 30;

export function Scene3() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowVideo(true), 3400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [showVideo]);

  const cells: (number | null)[] = [];
  for (let i = 0; i < APRIL_OFFSET; i++) cells.push(null);
  for (let d = 1; d <= APRIL_DAYS; d++) cells.push(d);

  return (
    <div className="absolute inset-0">
      <PhoneFrame url="epialphas.com/events">
        <div className="absolute inset-0 bg-black">
          <MobileHeader title="EVENTS" />

          <div className="absolute inset-x-0 overflow-hidden" style={{ top: 52, bottom: 64 }}>
            <AnimatePresence mode="wait">
              {!showVideo ? (
                <motion.div
                  key="cal"
                  className="absolute inset-0 px-4 pt-3 flex flex-col"
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45 }}
                >
                  <div className="flex items-baseline justify-between">
                    <h2
                      style={{
                        fontFamily: 'Cinzel, serif',
                        color: '#f0d58f',
                        fontSize: 20,
                        letterSpacing: '0.1em',
                      }}
                    >
                      APRIL 2026
                    </h2>
                    <span
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        color: 'rgba(255,255,255,0.45)',
                        fontSize: 9,
                        letterSpacing: '0.2em',
                      }}
                    >
                      MONTH ▸
                    </span>
                  </div>
                  <div className="h-[2px] bg-[#c99a2e] mt-1.5 mb-2" />
                  <div className="grid grid-cols-7 gap-1">
                    {DAYS.map((d, i) => (
                      <div
                        key={i}
                        className="text-center"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: 9,
                          letterSpacing: '0.1em',
                        }}
                      >
                        {d}
                      </div>
                    ))}
                    {cells.map((day, i) => {
                      const isTarget = day === 28;
                      return (
                        <motion.div
                          key={i}
                          className="aspect-square flex items-center justify-center rounded-md"
                          style={{
                            fontFamily: 'Manrope, sans-serif',
                            fontSize: 10,
                            color: day ? (isTarget ? '#000' : 'rgba(255,255,255,0.85)') : 'transparent',
                            background: isTarget ? '#c99a2e' : 'transparent',
                            fontWeight: isTarget ? 700 : 500,
                            border: isTarget ? 'none' : '1px solid rgba(255,255,255,0.06)',
                          }}
                          animate={
                            isTarget
                              ? {
                                  boxShadow: [
                                    '0 0 0 0 rgba(201,154,46,0.0)',
                                    '0 0 0 8px rgba(201,154,46,0.0)',
                                    '0 0 0 0 rgba(201,154,46,0.5)',
                                  ],
                                }
                              : {}
                          }
                          transition={{ duration: 1.6, repeat: Infinity, delay: 0.6 }}
                        >
                          {day ?? ''}
                        </motion.div>
                      );
                    })}
                  </div>
                  <motion.div
                    className="mt-3 px-3 py-2 rounded-lg"
                    style={{
                      background: 'rgba(201,154,46,0.12)',
                      border: '1px solid rgba(201,154,46,0.4)',
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <div
                      style={{
                        fontFamily: 'Cinzel, serif',
                        color: '#f0d58f',
                        fontSize: 12,
                        letterSpacing: '0.08em',
                      }}
                    >
                      APR 28 · ICT — CAIN & GREAUX
                    </div>
                    <div
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: 10,
                        marginTop: 2,
                      }}
                    >
                      Inter-Chapter Tournament · Tap to watch
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="video"
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  <video
                    ref={videoRef}
                    src={ICT_VIDEO}
                    poster={ICT_POSTER}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 px-4 py-3"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}
                  >
                    <div
                      style={{
                        fontFamily: 'Cinzel, serif',
                        color: '#f0d58f',
                        fontSize: 14,
                        letterSpacing: '0.1em',
                      }}
                    >
                      ICT · APR 28
                    </div>
                    <div
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: 10,
                      }}
                    >
                      @epialphas
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <TabBar active="Events" highlightDelay={1.0} />
        </div>
      </PhoneFrame>

      <Cursor
        waypoints={[
          { x: 50, y: 102 },
          { x: 50, y: 93, tap: true },
          { x: 47, y: 48, tap: true },
          { x: 50, y: 70 },
        ]}
        startDelayMs={150}
        stepMs={950}
      />
    </div>
  );
}
