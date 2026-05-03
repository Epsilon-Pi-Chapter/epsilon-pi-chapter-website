import { motion } from 'framer-motion';
import { PhoneFrame } from '../parts/PhoneFrame';
import { SiteShell } from '../parts/SiteShell';
import { Cursor } from '../parts/Cursor';

const BASE = import.meta.env.BASE_URL;

const OFFICERS = [
  { role: 'Chapter President', name: 'Jahkari N. Taylor', photo: '' },
  { role: '1st Vice President', name: 'Nyles Ferguson', photo: 'nyles-ferguson.png' },
  { role: '2nd Vice President', name: 'Khamani Battiste', photo: 'khamani-battiste.png' },
  { role: 'Recording Secretary', name: 'Allan J. White', photo: '' },
  { role: 'Corresponding Secretary', name: 'Ian Thomas', photo: 'ian-thomas.png' },
  { role: 'Treasurer', name: 'Joseph Hargett', photo: 'joseph-hargett.png' },
  { role: 'Chapter Dean of Membership', name: 'Jahkael Parker', photo: '' },
  { role: 'Sergeant-At-Arms', name: 'Adarius Johnson', photo: 'adarius-johnson.png' },
  { role: 'Editor of the Sphinx', name: 'Simeon Butler', photo: 'simeon-butler.png' },
  { role: 'Historian', name: 'Brett Andrews, Jr.', photo: 'brett-andrews-jr.png' },
  { role: 'Parliamentarian', name: 'Jaleel Drummond', photo: 'jaleel-drummond.png' },
  { role: 'Chaplain', name: 'Jaylen L. Johnson', photo: 'jaylen-johnson.png' },
  { role: 'Chapter Advisor', name: 'Dr. Leon Rousen', photo: 'leon-rousen.png' },
];

export function Scene4() {
  return (
    <div className="absolute inset-0">
      <PhoneFrame url="epialphas.com/#leadership">
        <SiteShell
          activeTab="Leadership"
          panelTitle="Chapter Leadership"
          scrollY={120}
          scrollDelay={1.6}
          scrollDuration={2.8}
        >
          <p
            style={{
              margin: 0,
              fontSize: 8,
              color: '#f0d58f',
              fontFamily: '"Cinzel", serif',
              letterSpacing: '0.06em',
            }}
          >
            2026-2027 Chapter Officers
          </p>

          {/* Officer cards — single column on mobile mirrors site */}
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {OFFICERS.map((o, i) => (
              <motion.div
                key={o.name}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(201,154,46,0.18)',
                  borderRadius: 10,
                  overflow: 'hidden',
                  display: 'flex',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              >
                <div
                  style={{
                    width: 64,
                    aspectRatio: '4/5',
                    background: 'rgba(0,0,0,0.3)',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {o.photo ? (
                    <img
                      src={`${BASE}assets/portraits/${o.photo}`}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: '"Cinzel", serif',
                        color: '#c99a2e',
                        fontSize: 18,
                        letterSpacing: '0.04em',
                        background:
                          'linear-gradient(135deg, rgba(201,154,46,0.15), rgba(201,154,46,0.04))',
                      }}
                    >
                      {o.name
                        .replace(/^Dr\.\s+/, '')
                        .split(/\s+/)
                        .map((p) => p[0])
                        .filter(Boolean)
                        .slice(0, 2)
                        .join('')}
                    </div>
                  )}
                </div>
                <div style={{ padding: '6px 8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: '"Cinzel", serif',
                      color: '#c99a2e',
                      fontSize: 6.5,
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {o.role}
                  </div>
                  <div
                    style={{
                      fontFamily: '"Cinzel", serif',
                      color: '#f0d58f',
                      fontSize: 9.5,
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    {o.name}
                  </div>
                  <div
                    style={{
                      width: 22,
                      height: 1,
                      background: 'linear-gradient(90deg, #c99a2e, transparent)',
                      marginTop: 2,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </SiteShell>
      </PhoneFrame>

      {/* Cursor taps "Leadership" tab (row 1 col 3) */}
      <Cursor
        waypoints={[
          { x: 30, y: 70 },
          { x: 50, y: 19, tap: true },
          { x: 50, y: 55 },
        ]}
        startDelayMs={200}
        stepMs={800}
      />
    </div>
  );
}
