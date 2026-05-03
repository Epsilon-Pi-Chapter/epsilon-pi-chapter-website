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
            </SiteShell>
          </motion.div>
        )}
      </PhoneFrame>
    </div>
  );
}
