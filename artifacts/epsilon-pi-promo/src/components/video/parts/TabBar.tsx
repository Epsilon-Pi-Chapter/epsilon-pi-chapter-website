import { motion } from 'framer-motion';

export const SITE_TABS = ['Home', 'Lineage', 'Events', 'Officers', 'Awards'] as const;
export type SiteTab = (typeof SITE_TABS)[number];

const ICONS: Record<SiteTab, React.ReactNode> = {
  Home: (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  Lineage: (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      <circle cx="12" cy="6" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 9v3M12 12L7 16M12 12l5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Events: (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Officers: (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  Awards: (
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
      <path d="M8 4h8v5a4 4 0 1 1-8 0V4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M5 5h3M16 5h3M9 14l-1 6 4-2 4 2-1-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
};

export function TabBar({
  active,
  highlightDelay = 0,
}: {
  active: SiteTab;
  highlightDelay?: number;
}) {
  return (
    <div
      className="absolute left-0 right-0 bottom-0 z-20 flex items-stretch justify-around px-2"
      style={{
        background: 'rgba(10,10,10,0.96)',
        borderTop: '1px solid rgba(201,154,46,0.25)',
        height: 64,
        backdropFilter: 'blur(8px)',
      }}
    >
      {SITE_TABS.map((t) => {
        const isActive = t === active;
        return (
          <div
            key={t}
            className="relative flex flex-col items-center justify-center flex-1 gap-1"
            style={{ color: isActive ? '#c99a2e' : 'rgba(255,255,255,0.5)' }}
          >
            {ICONS[t]}
            <span
              className="uppercase"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 9,
                letterSpacing: '0.14em',
                fontWeight: isActive ? 700 : 500,
              }}
            >
              {t}
            </span>
            {isActive && (
              <motion.div
                className="absolute top-0 h-[2px]"
                style={{ background: '#c99a2e', width: '40%' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: highlightDelay, ease: 'easeOut' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
