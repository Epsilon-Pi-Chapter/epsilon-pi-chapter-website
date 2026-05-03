import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function PhoneFrame({
  children,
  url = 'epialphas.com',
  typing,
}: {
  children: ReactNode;
  url?: string;
  typing?: boolean;
}) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative"
        style={{
          width: '82%',
          height: '86%',
          borderRadius: '54px',
          background: '#0a0a0a',
          border: '4px solid #1c1c1c',
          boxShadow:
            '0 0 80px rgba(201,154,46,0.22), inset 0 0 0 2px rgba(255,255,255,0.04)',
          overflow: 'hidden',
        }}
      >
        {/* Status bar */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 z-30"
          style={{
            height: '46px',
            color: 'rgba(255,255,255,0.85)',
            fontFamily: 'Manrope, sans-serif',
            fontSize: '15px',
            fontWeight: 600,
          }}
        >
          <span>9:41</span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>•••</span>
        </div>
        {/* Notch */}
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 z-30"
          style={{ width: 110, height: 28, background: '#000', borderRadius: 14 }}
        />

        {/* URL bar */}
        <div
          className="absolute left-0 right-0 z-20 flex items-center justify-center px-5"
          style={{
            top: 50,
            height: 38,
          }}
        >
          <div
            className="flex items-center gap-2 w-full px-4"
            style={{
              height: 32,
              borderRadius: 16,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(201,154,46,0.25)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M7 10V8a5 5 0 0 1 10 0v2m-12 0h14v10H5V10z" stroke="#c99a2e" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <span
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 13,
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.02em',
              }}
            >
              {url}
              {typing && (
                <motion.span
                  className="inline-block ml-0.5"
                  style={{ width: 1, background: '#c99a2e', height: 12, verticalAlign: 'middle' }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </span>
          </div>
        </div>

        {/* Screen content */}
        <div className="absolute inset-0 bg-black overflow-hidden" style={{ paddingTop: 96 }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
