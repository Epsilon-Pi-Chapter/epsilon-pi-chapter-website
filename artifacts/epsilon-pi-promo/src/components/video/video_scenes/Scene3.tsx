import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PhoneFrame } from '../parts/PhoneFrame';
import { SiteShell } from '../parts/SiteShell';
import { Cursor } from '../parts/Cursor';
import {
  eventsCalendar,
  iceColdTuesdayContent,
  isSchoolYearTuesday,
} from '../../../data/chapter-data';

const BASE = import.meta.env.BASE_URL;

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const APRIL_OFFSET = 3; // April 1, 2026 is Wed
const APRIL_DAYS = 30;
const MONTH_PREFIX = '2026-04';

type Marker = 'event' | 'service' | 'ict' | 'both';

// Derive day -> marker map from shared eventsCalendar + ICT rules so the
// promo and the live site stay in sync without manual maintenance.
function buildAprilMarkers(): Record<number, Marker> {
  const out: Record<number, Marker> = {};
  // ICT caps: every school-year Tuesday in April 2026.
  for (let d = 1; d <= APRIL_DAYS; d++) {
    const date = new Date(2026, 3, d);
    if (isSchoolYearTuesday(date)) out[d] = 'ict';
  }
  // Scheduled events / service in April.
  for (const ev of eventsCalendar) {
    if (!ev.date.startsWith(MONTH_PREFIX)) continue;
    const day = Number(ev.date.slice(-2));
    const existing = out[day];
    if (existing === 'ict' && (ev.category === 'event' || ev.category === 'service')) {
      out[day] = 'both';
    } else if (!existing) {
      out[day] = ev.category;
    }
  }
  return out;
}

export function Scene3() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowVideo(true), 4200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [showVideo]);

  const EVENTS = useMemo(buildAprilMarkers, []);
  // Pick the first ICT date in the shared data that falls in the rendered
  // month — keeps Scene3 in sync when chapter-data.ts rolls forward.
  const SELECTED_DATE =
    Object.keys(iceColdTuesdayContent)
      .sort()
      .find((d) => d.startsWith(MONTH_PREFIX)) ?? '2026-04-28';
  const selectedDay = Number(SELECTED_DATE.slice(-2));
  const selectedDateObj = new Date(`${SELECTED_DATE}T12:00:00`);
  const SELECTED_LABEL = selectedDateObj
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    .toUpperCase();
  const selectedEvent = eventsCalendar.find((e) => e.date === SELECTED_DATE);
  const selectedIct = iceColdTuesdayContent[SELECTED_DATE];
  const ICT_VIDEO = selectedIct ? `${BASE}${selectedIct.video}` : '';
  const ICT_POSTER = selectedIct ? `${BASE}${selectedIct.poster}` : '';
  const isIctDay = !!selectedIct;
  const ictSnippet = selectedIct
    ? selectedIct.caption.split(/(?<=[.!?])\s+/)[0]
    : '';

  const cells: (number | null)[] = [];
  for (let i = 0; i < APRIL_OFFSET; i++) cells.push(null);
  for (let d = 1; d <= APRIL_DAYS; d++) cells.push(d);

  return (
    <div className="absolute inset-0">
      <PhoneFrame url="epialphas.com/#events">
        <div className="absolute inset-0">
          <SiteShell
            activeTab="Events"
            panelTitle="Events"
            scrollY={showVideo ? 220 : 0}
            scrollDelay={0}
            scrollDuration={0.7}
          >
                {/* Calendar header */}
                <div className="flex items-start justify-between" style={{ gap: 4 }}>
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        color: '#c99a2e',
                        fontFamily: '"Cinzel", serif',
                        fontSize: 11,
                        letterSpacing: '0.06em',
                        fontWeight: 700,
                      }}
                    >
                      Chapter Calendar
                    </h3>
                    {/* Legend */}
                    <div
                      className="flex flex-wrap"
                      style={{ gap: '4px 8px', marginTop: 4 }}
                    >
                      {[
                        { label: 'Today', color: 'transparent', border: '1.5px solid #c99a2e' },
                        { label: 'Service', color: 'rgba(98,178,165,0.45)' },
                        { label: 'Event', color: 'rgba(217,159,81,0.45)' },
                        { label: 'ICT', color: 'rgba(180,220,255,0.6)' },
                      ].map((l) => (
                        <span
                          key={l.label}
                          className="inline-flex items-center"
                          style={{ gap: 3, fontSize: 6.5, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em', textTransform: 'uppercase' }}
                        >
                          <span
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: 2,
                              background: l.color,
                              border: l.border ?? '1px solid rgba(255,255,255,0.12)',
                              display: 'inline-block',
                            }}
                          />
                          {l.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className="flex items-center"
                    style={{
                      gap: 4,
                      padding: '3px 4px',
                      background: 'rgba(201,154,46,0.08)',
                      border: '1px solid rgba(201,154,46,0.18)',
                      borderRadius: 999,
                    }}
                  >
                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', color: '#f0d58f', fontSize: 9, lineHeight: '12px', textAlign: 'center' }}>‹</span>
                    <span style={{ fontSize: 7, color: '#f0d58f', fontWeight: 700 }}>April 2026</span>
                    <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', color: '#f0d58f', fontSize: 9, lineHeight: '12px', textAlign: 'center' }}>›</span>
                  </div>
                </div>

                {/* Weekdays */}
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                    gap: 2.5,
                    marginTop: 8,
                  }}
                >
                  {DAYS.map((d) => (
                    <div
                      key={d}
                      style={{
                        textAlign: 'center',
                        fontSize: 5.5,
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        color: 'rgba(255,255,255,0.48)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day grid */}
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                    gap: 2.5,
                    marginTop: 3,
                  }}
                >
                  {cells.map((day, i) => {
                    const cat = day ? EVENTS[day] : undefined;
                    const isTarget = day === 28;
                    const bg =
                      cat === 'event' ? 'rgba(217,159,81,0.16)' :
                      cat === 'service' ? 'rgba(98,178,165,0.16)' :
                      cat === 'ict' ? 'linear-gradient(180deg, rgba(160,210,255,0.18), rgba(100,150,200,0.08))' :
                      cat === 'both' ? 'linear-gradient(135deg, rgba(98,178,165,0.22) 0 50%, rgba(217,159,81,0.22) 50% 100%)' :
                      day ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.015)';
                    const border =
                      cat === 'event' ? 'rgba(217,159,81,0.42)' :
                      cat === 'service' ? 'rgba(98,178,165,0.45)' :
                      cat === 'ict' ? 'rgba(180,220,255,0.4)' :
                      cat === 'both' ? 'rgba(201,154,46,0.5)' :
                      'rgba(255,255,255,0.06)';
                    return (
                      <motion.div
                        key={i}
                        style={{
                          aspectRatio: '1 / 1',
                          background: bg,
                          border: `1px solid ${border}`,
                          borderRadius: 4,
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-end',
                          padding: 2,
                          fontSize: 6,
                          fontWeight: 700,
                          color: day ? 'rgba(255,255,255,0.85)' : 'transparent',
                          boxShadow: isTarget ? 'inset 0 0 0 1.2px #c99a2e' : 'none',
                        }}
                        animate={
                          isTarget
                            ? {
                                boxShadow: [
                                  'inset 0 0 0 1.2px #c99a2e, 0 0 0 0 rgba(201,154,46,0.0)',
                                  'inset 0 0 0 1.2px #c99a2e, 0 0 0 4px rgba(201,154,46,0.0)',
                                  'inset 0 0 0 1.2px #c99a2e, 0 0 8px rgba(201,154,46,0.6)',
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

                {/* Selected detail — expands inline to host the ICT clip */}
                <motion.div
                  style={{
                    marginTop: 8,
                    padding: '6px 8px 8px',
                    background: 'rgba(180,220,255,0.1)',
                    border: '1px solid rgba(180,220,255,0.4)',
                    borderRadius: 8,
                    overflow: 'hidden',
                  }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <div
                    style={{
                      fontFamily: '"Cinzel", serif',
                      color: '#f0d58f',
                      fontSize: 8,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {SELECTED_LABEL}
                    {isIctDay ? ' · ICE COLD TUESDAY' : ''}
                  </div>
                  {selectedEvent && (
                    <div
                      style={{
                        fontSize: 6.5,
                        color: 'rgba(255,255,255,0.85)',
                        marginTop: 2,
                        lineHeight: 1.35,
                      }}
                    >
                      <span style={{ color: '#f0d58f', fontWeight: 700 }}>
                        {selectedEvent.title}
                      </span>
                      {selectedEvent.time ? ` · ${selectedEvent.time}` : ''}
                      {selectedEvent.location ? ` · ${selectedEvent.location}` : ''}
                    </div>
                  )}
                  {ictSnippet && (
                    <div
                      style={{
                        fontSize: 6.5,
                        color: 'rgba(255,255,255,0.65)',
                        marginTop: 2,
                        lineHeight: 1.35,
                      }}
                    >
                      {ictSnippet}
                    </div>
                  )}
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={
                      showVideo
                        ? { height: 'auto', opacity: 1, marginTop: 6 }
                        : { height: 0, opacity: 0, marginTop: 0 }
                    }
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden', borderRadius: 6 }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '9/16',
                        background: '#000',
                        borderRadius: 6,
                        overflow: 'hidden',
                      }}
                    >
                      <video
                        ref={videoRef}
                        src={ICT_VIDEO}
                        poster={ICT_POSTER}
                        muted
                        autoPlay
                        loop
                        playsInline
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          bottom: 0,
                          padding: '8px 8px 6px',
                          background: 'linear-gradient(to top, rgba(0,0,0,0.78), transparent)',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: '"Cinzel", serif',
                            color: '#f0d58f',
                            fontSize: 7,
                            letterSpacing: '0.08em',
                          }}
                        >
                          04 · 28 · 2026
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
          </SiteShell>
        </div>
      </PhoneFrame>

      {/* Cursor taps Events tab (row 2 col 2) then taps the Apr 28 cell */}
      <Cursor
        waypoints={[
          { x: 30, y: 70 },
          { x: 42, y: 26, tap: true },
          { x: 65, y: 50 },
          { x: 65, y: 50, tap: true },
        ]}
        startDelayMs={200}
        stepMs={1100}
      />
    </div>
  );
}
