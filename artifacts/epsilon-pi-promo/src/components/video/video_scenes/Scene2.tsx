import { PhoneFrame } from '../parts/PhoneFrame';
import { SiteShell } from '../parts/SiteShell';
import { Cursor } from '../parts/Cursor';

const BASE = import.meta.env.BASE_URL;

const TERMS = ['Spring 2026', 'Spring 2024', 'Spring 2023', 'Spring 2022', 'Fall 2021', 'Spring 2021'];
const ACTIVE_TERM = 'Spring 2026';

const MEMBERS = [
  { num: '1', pos: 'Ace', name: 'Adarius Johnson', line: 'K1ll Switch', photo: 'adarius-johnson.png', major: 'Exercise Science w/ focus in Kinesiotherapy' },
  { num: '2', pos: 'Deuce', name: 'Justin Claiborne', line: 'Flu Game', photo: 'justin-claiborne.png', major: 'Computer Science w/ focus in Cybersecurity' },
  { num: '3', pos: 'Tre', name: 'Brandon Richardson', line: 'Tariq St. Patrick', photo: 'brandon-richardson.png', major: 'Business Management · Minor: Psychology' },
  { num: '4', pos: 'H4rdcore', name: 'Dylan Bryant', line: 'Spike Lee', photo: 'dylan-bryant.png', major: 'Graphic Design w/ focus in Fine Arts' },
  { num: '5', pos: 'Live 5ive', name: 'Ian Thomas', line: 'Ares', photo: 'ian-thomas.png', major: 'Interdisciplinary Studies (CJ & Marketing)' },
  { num: '6', pos: 'Slick 6ix', name: 'Simeon Butler', line: 'Pain Killer', photo: 'simeon-butler.png', major: 'Mass Communications · Minor: Business' },
  { num: '7', pos: 'Jewel', name: 'Kyree Williams', line: 'Eagle Eye', photo: 'kyree-williams.png', major: 'Psychology · Minor: Business' },
  { num: '8', pos: '8Ball', name: 'Jaleel Drummond', line: 'Creed', photo: 'jaleel-drummond.png', major: 'Social Work' },
  { num: '9', pos: 'Notorious 9ine', name: 'Nyles Ferguson', line: 'Mister Terrific', photo: 'nyles-ferguson.png', major: 'Political Science' },
  { num: '10', pos: 'Dime', name: 'Brett Andrews, Jr.', line: 'Man of Steel', photo: 'brett-andrews-jr.png', major: 'Computer Engineering Technology' },
  { num: '11', pos: 'Fly E11even — Tail', name: 'Joseph Hargett', line: 'Hail Mary', photo: 'joseph-hargett.png', major: 'Business Marketing' },
];

export function Scene2() {
  return (
    <div className="absolute inset-0">
      <PhoneFrame url="epialphas.com/#lineage">
        <SiteShell
          activeTab="Lineage"
          panelTitle="Lineage"
          scrollY={180}
          scrollDelay={1.8}
          scrollDuration={3.6}
        >
          {/* Term pill scroller */}
          <div
            className="flex"
            style={{
              gap: 4,
              overflowX: 'hidden',
              padding: '4px 0 6px',
            }}
          >
            {TERMS.map((t) => {
              const active = t === ACTIVE_TERM;
              return (
                <div
                  key={t}
                  style={{
                    flexShrink: 0,
                    padding: '4px 8px',
                    fontSize: 7.5,
                    fontFamily: '"Manrope", sans-serif',
                    color: active ? '#000' : 'rgba(255,255,255,0.7)',
                    background: active ? '#c99a2e' : 'rgba(255,255,255,0.06)',
                    border: active ? '1px solid #c99a2e' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 6,
                    boxShadow: active ? '0 0 0 1.5px #c99a2e' : 'none',
                  }}
                >
                  {t}
                </div>
              );
            })}
          </div>

          {/* Line title */}
          <div
            style={{
              marginTop: 8,
              padding: '10px 10px 14px',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.06)',
            }}
          >
            <h3
              style={{
                margin: 0,
                fontFamily: '"Cinzel", serif',
                color: '#c99a2e',
                fontSize: 9.5,
                letterSpacing: '0.06em',
                fontWeight: 700,
              }}
            >
              Spring 2026
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: 9, color: 'rgba(255,255,255,0.85)', lineHeight: 1.3 }}>
              The 11 Virtues of P.E.A.C.E.
            </p>
            <p
              style={{
                margin: '4px 0 0',
                fontSize: 7.5,
                color: '#c99a2e',
                fontFamily: '"Cinzel", serif',
                letterSpacing: '0.04em',
              }}
            >
              Chapter Dean: Jordan Cain
            </p>

            {/* Member rows */}
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {MEMBERS.map((m) => (
                <div
                  key={m.num}
                  className="flex items-center"
                  style={{
                    gap: 8,
                    padding: '5px 6px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: 8,
                  }}
                >
                  <img
                    src={`${BASE}assets/portraits/${m.photo}`}
                    alt=""
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 6,
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        fontFamily: '"Cinzel", serif',
                        color: '#f0d58f',
                        fontSize: 8,
                        letterSpacing: '0.04em',
                        lineHeight: 1.2,
                      }}
                    >
                      {m.num}/{m.pos} · {m.name}
                    </div>
                    <div
                      style={{
                        fontFamily: '"Cinzel", serif',
                        color: '#c99a2e',
                        fontSize: 7.5,
                        marginTop: 1,
                        fontStyle: 'italic',
                      }}
                    >
                      "{m.line}"
                    </div>
                    <div
                      style={{
                        fontSize: 6.5,
                        color: 'rgba(255,255,255,0.55)',
                        marginTop: 1,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {m.major}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SiteShell>
      </PhoneFrame>

      {/* Cursor enters and taps "Lineage" tab in nav row 1 col 4 */}
      <Cursor
        waypoints={[
          { x: 60, y: 70 },
          { x: 67, y: 19, tap: true },
          { x: 50, y: 50 },
        ]}
        startDelayMs={200}
        stepMs={800}
      />
    </div>
  );
}
