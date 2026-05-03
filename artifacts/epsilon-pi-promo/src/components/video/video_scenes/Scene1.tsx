import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PhoneFrame } from '../parts/PhoneFrame';
import { SiteShell } from '../parts/SiteShell';

const BASE = import.meta.env.BASE_URL;
const HERO_PHOTO = `${BASE}assets/line-photos/spring-2026-1.png`;
const FULL_URL = 'epialphas.com';

const CHIPS = ['Chapter Overview', 'Mission & Values', 'Announcements', 'Upcoming Events'];

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
          <div className="w-full h-full bg-black" />
        ) : (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SiteShell activeTab="Home" panelTitle="Welcome Message">
              <p
                style={{
                  margin: 0,
                  fontSize: 8.5,
                  lineHeight: 1.5,
                  color: '#fff',
                }}
              >
                Welcome to the official Epsilon Pi Chapter website. This space is designed to share
                our chapter's mission, leadership, impact, and legacy.
              </p>
              <div
                className="flex flex-wrap"
                style={{ gap: 4, marginTop: 8 }}
              >
                {CHIPS.map((c) => (
                  <span
                    key={c}
                    style={{
                      border: '1px solid rgba(201,154,46,0.4)',
                      borderRadius: 999,
                      padding: '3px 7px',
                      fontSize: 7,
                      color: '#f0d58f',
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div
                style={{
                  marginTop: 10,
                  width: '100%',
                  aspectRatio: '16/10',
                  borderRadius: 10,
                  border: '1px solid rgba(201,154,46,0.25)',
                  overflow: 'hidden',
                }}
              >
                <img src={HERO_PHOTO} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Compact Chapter Calendar peek — mirrors mobile Home layout */}
              <div
                style={{
                  marginTop: 10,
                  padding: '8px 8px 9px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,154,46,0.22)',
                  borderRadius: 10,
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: 5 }}>
                  <div
                    style={{
                      fontFamily: '"Cinzel", serif',
                      color: '#c99a2e',
                      fontSize: 8.5,
                      letterSpacing: '0.06em',
                      fontWeight: 700,
                    }}
                  >
                    Chapter Calendar
                  </div>
                  <div
                    style={{
                      fontSize: 6.5,
                      color: '#f0d58f',
                      letterSpacing: '0.06em',
                    }}
                  >
                    APRIL 2026
                  </div>
                </div>
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: 'repeat(7, minmax(0,1fr))',
                    gap: 2,
                    marginTop: 2,
                  }}
                >
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div
                      key={i}
                      style={{
                        textAlign: 'center',
                        fontSize: 5,
                        letterSpacing: '0.08em',
                        color: 'rgba(255,255,255,0.45)',
                        fontWeight: 700,
                      }}
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: 'repeat(7, minmax(0,1fr))',
                    gap: 2,
                    marginTop: 2,
                  }}
                >
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 2; // Apr 1 = Wed (index 3)
                    const inMonth = day >= 1 && day <= 30;
                    const dotColor =
                      day === 4 ? 'rgba(98,178,165,0.9)' :
                      day === 11 ? 'rgba(217,159,81,0.9)' :
                      day === 18 ? 'rgba(201,154,46,0.9)' :
                      day === 28 ? 'rgba(180,220,255,0.9)' :
                      null;
                    return (
                      <div
                        key={i}
                        style={{
                          aspectRatio: '1/1',
                          background: inMonth ? 'rgba(255,255,255,0.03)' : 'transparent',
                          border: '1px solid rgba(255,255,255,0.05)',
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 5,
                          color: inMonth ? 'rgba(255,255,255,0.55)' : 'transparent',
                          position: 'relative',
                        }}
                      >
                        {inMonth ? day : ''}
                        {dotColor && (
                          <div
                            style={{
                              position: 'absolute',
                              bottom: 1,
                              width: 3,
                              height: 3,
                              borderRadius: '50%',
                              background: dotColor,
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </SiteShell>
          </motion.div>
        )}
      </PhoneFrame>
    </div>
  );
}
