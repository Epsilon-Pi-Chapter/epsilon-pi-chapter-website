const LOGO = `${import.meta.env.BASE_URL}assets/chapter-logo.png`;

export function MobileHeader({ title }: { title?: string }) {
  return (
    <div
      className="absolute left-0 right-0 z-10 flex items-center justify-between px-4"
      style={{
        top: 0,
        height: 52,
        background: 'rgba(10,10,10,0.95)',
        borderBottom: '1px solid rgba(201,154,46,0.2)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Hamburger */}
      <div className="flex flex-col gap-[3px]">
        <span style={{ width: 18, height: 1.5, background: '#c99a2e' }} />
        <span style={{ width: 18, height: 1.5, background: '#c99a2e' }} />
        <span style={{ width: 18, height: 1.5, background: '#c99a2e' }} />
      </div>

      {/* Center brand */}
      <div className="flex items-center gap-2">
        <img src={LOGO} alt="" style={{ width: 22, height: 22, objectFit: 'contain' }} />
        <span
          style={{
            fontFamily: 'Cinzel, serif',
            color: '#f0d58f',
            fontSize: 12,
            letterSpacing: '0.22em',
            fontWeight: 700,
          }}
        >
          {title ?? 'EPSILON PI'}
        </span>
      </div>

      {/* Bell */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 17h12l-1.5-2V11a4.5 4.5 0 1 0-9 0v4L6 17zm4 2a2 2 0 0 0 4 0"
          stroke="#c99a2e"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
