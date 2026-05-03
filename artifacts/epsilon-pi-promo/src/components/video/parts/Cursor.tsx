import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Waypoint {
  x: number;
  y: number;
  tap?: boolean;
  delay?: number;
}

interface CursorProps {
  waypoints: Waypoint[];
  startDelayMs?: number;
  stepMs?: number;
}

export function Cursor({ waypoints, startDelayMs = 200, stepMs = 700 }: CursorProps) {
  const [step, setStep] = useState(0);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [tapping, setTapping] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    waypoints.forEach((wp, i) => {
      const t = startDelayMs + i * stepMs + (wp.delay ?? 0);
      timers.push(
        setTimeout(() => {
          setStep(i);
          if (wp.tap) {
            setTapping(true);
            setRipples((prev) => [...prev, { id: Date.now() + i, x: wp.x, y: wp.y }]);
            setTimeout(() => setTapping(false), 220);
          }
        }, t),
      );
    });
    return () => timers.forEach((t) => clearTimeout(t));
  }, [waypoints, startDelayMs, stepMs]);

  const current = waypoints[step] ?? waypoints[0];

  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className="absolute rounded-full border-2"
          style={{
            left: `${r.x}%`,
            top: `${r.y}%`,
            translateX: '-50%',
            translateY: '-50%',
            borderColor: '#c99a2e',
          }}
          initial={{ width: 12, height: 12, opacity: 0.9 }}
          animate={{ width: 220, height: 220, opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      ))}

      <motion.div
        className="absolute"
        style={{ left: 0, top: 0 }}
        initial={false}
        animate={{
          left: `${current.x}%`,
          top: `${current.y}%`,
          scale: tapping ? 0.78 : 1,
        }}
        transition={{
          left: { type: 'spring', stiffness: 60, damping: 16, mass: 1.2 },
          top: { type: 'spring', stiffness: 60, damping: 16, mass: 1.2 },
          scale: { duration: 0.18, ease: 'easeOut' },
        }}
      >
        <div
          style={{
            transform: 'translate(-30%, -10%)',
            filter: 'drop-shadow(0 0 12px rgba(201, 154, 46, 0.7))',
          }}
        >
          <svg width="46" height="56" viewBox="0 0 46 56" fill="none">
            <path
              d="M6 4 L6 40 L14 32 L20 48 L26 46 L20 30 L32 30 Z"
              fill="white"
              stroke="rgba(0,0,0,0.4)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
