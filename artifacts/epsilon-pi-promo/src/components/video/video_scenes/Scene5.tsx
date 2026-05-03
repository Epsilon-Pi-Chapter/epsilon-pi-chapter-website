import { motion } from 'framer-motion';
import { PhoneFrame } from '../parts/PhoneFrame';
import { SiteShell } from '../parts/SiteShell';
import { Cursor } from '../parts/Cursor';

const ACHIEVEMENTS: { year: string; awards: string[] }[] = [
  { year: '2026', awards: ['Charles H. Wesley Award', 'Eastern Region Brother of the Year — Bro. Jaden Johnson'] },
  { year: '2024/2025', awards: ['VACAPAF Brother Of The Year', 'Eastern Region Brother Of The Year', 'National Step Show Champions'] },
  { year: '2022/2023', awards: ['VACAPAF & Eastern Region College Chapter Of The Year', 'VACAPAF & Eastern Region Charles H. Wesley Award'] },
  { year: '2021/2022', awards: ['VACAPAF Unconditional Service Award', 'VACAPAF Scholars Bowl Winner'] },
];

export function Scene5() {
  return (
    <div className="absolute inset-0">
      <PhoneFrame url="epialphas.com/#history">
        <SiteShell
          activeTab="History"
          panelTitle="Chapter History"
          scrollY={140}
          scrollDelay={1.6}
          scrollDuration={2.8}
        >
          {/* Founding + Charter cards stacked (mobile two-col collapses to 1) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <article
              style={{
                padding: '8px 10px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderLeft: '2px solid rgba(201,154,46,0.55)',
                borderRadius: 6,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: '"Cinzel", serif',
                  color: '#c99a2e',
                  fontSize: 10,
                  letterSpacing: '0.06em',
                  fontWeight: 700,
                }}
              >
                Epsilon Pi
              </h3>
              <p style={{ margin: '4px 0 6px', color: '#f0d58f', fontStyle: 'italic', fontSize: 7.5 }}>
                Founding Date: Friday, October 12, 1962
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[['House', '324'], ['Region', 'Eastern'], ['District', '7'], ['Area', '8']].map(([k, v]) => (
                  <li key={k} style={{ display: 'flex', gap: 6, fontSize: 7 }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: 6, fontWeight: 600, minWidth: 40 }}>{k}</span>
                    <span style={{ color: '#f0d58f' }}>{v}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article
              style={{
                padding: '8px 10px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderLeft: '2px solid rgba(201,154,46,0.55)',
                borderRadius: 6,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: '"Cinzel", serif',
                  color: '#c99a2e',
                  fontSize: 10,
                  letterSpacing: '0.06em',
                  fontWeight: 700,
                }}
              >
                Charter Members
              </h3>
              <p style={{ margin: '4px 0 4px', fontFamily: '"Cinzel", serif', color: '#c99a2e', fontWeight: 700, letterSpacing: '0.05em', fontSize: 11 }}>
                15 Visionaries
              </p>
              <p style={{ margin: 0, fontSize: 7, color: '#f0d58f', lineHeight: 1.4 }}>
                Andrew Blackburn, Vincent Blue, Willie Booth, William Brothers, Nathaniel Bynum, Berkley Chandler, Eugene Davis, Melvin C. Fallis Jr., James F. Gay, William Gray, Zane Gray, Ralph Hill, James Howard, Claywood Jones, Winston Nottingham
              </p>
            </article>

            {/* Awards timeline */}
            <h3
              style={{
                margin: '6px 0 4px',
                fontFamily: '"Cinzel", serif',
                color: '#c99a2e',
                fontSize: 10,
                letterSpacing: '0.06em',
                fontWeight: 700,
              }}
            >
              Awards and Achievements
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {ACHIEVEMENTS.map((a, i) => (
                <motion.div
                  key={a.year}
                  style={{
                    background: 'rgba(201,154,46,0.06)',
                    border: '1px solid rgba(201,154,46,0.25)',
                    borderRadius: 6,
                    padding: '5px 7px',
                    display: 'flex',
                    gap: 6,
                  }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.6 + i * 0.12 }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      minWidth: 32,
                      background: '#c99a2e',
                      color: '#000',
                      fontFamily: '"Cinzel", serif',
                      fontSize: 7,
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '2px 4px',
                    }}
                  >
                    {a.year}
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', flex: 1 }}>
                    {a.awards.map((w) => (
                      <li
                        key={w}
                        style={{
                          fontSize: 7,
                          color: 'rgba(255,255,255,0.9)',
                          lineHeight: 1.3,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {w}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </SiteShell>
      </PhoneFrame>

      {/* Cursor taps History tab (row 1 col 2) */}
      <Cursor
        waypoints={[
          { x: 30, y: 70 },
          { x: 35, y: 19, tap: true },
          { x: 50, y: 50 },
        ]}
        startDelayMs={200}
        stepMs={800}
      />
    </div>
  );
}
