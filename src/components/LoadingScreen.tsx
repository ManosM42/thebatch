import { useEffect, useState } from 'react';

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [fill, setFill] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Animate fill from 0 to 100 over 2.2s
    const start = performance.now();
    const duration = 2200;
    const raf = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // ease in-out
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setFill(eased * 100);
      if (p < 1) requestAnimationFrame(raf);
      else {
        // wait a beat then fade out
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onDone, 600);
        }, 400);
      }
    };
    requestAnimationFrame(raf);
  }, [onDone]);

  const cupW = 120;
  const cupH = 100;
  const cupPath = `
    M 18 10
    L 10 ${cupH - 10}
    Q 10 ${cupH} 20 ${cupH}
    L ${cupW - 20} ${cupH}
    Q ${cupW - 10} ${cupH} ${cupW - 10} ${cupH - 10}
    L ${cupW - 18} 10
    Z
  `;
  const handlePath = `
    M ${cupW - 10} 28
    Q ${cupW + 30} 28 ${cupW + 30} 58
    Q ${cupW + 30} 80 ${cupW - 10} 80
  `;

  // Fill rect inside cup — clip from bottom
  const fillHeight = (cupH - 14) * (fill / 100);
  const fillY = cupH - 6 - fillHeight;

  const steamOpacity = fill > 80 ? (fill - 80) / 20 : 0;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32,
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.6s ease',
      pointerEvents: fadeOut ? 'none' : 'auto',
    }}>

      {/* Steam lines */}
      <div style={{ display: 'flex', gap: 10, height: 36, alignItems: 'flex-end', opacity: steamOpacity, transition: 'opacity 0.4s' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 2,
            height: 20 + i * 6,
            borderRadius: 2,
            background: 'rgba(232,240,0,0.5)',
            animation: `steam${i} 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
          }} />
        ))}
      </div>

      {/* Cup SVG */}
      <svg
        width={cupW + 40}
        height={cupH + 16}
        viewBox={`0 0 ${cupW + 40} ${cupH + 16}`}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <clipPath id="cupClip">
            <path d={cupPath} transform="translate(0, 6)" />
          </clipPath>
        </defs>

        {/* Saucer */}
        <ellipse
          cx={(cupW + 40) / 2}
          cy={cupH + 13}
          rx={cupW / 2 + 8}
          ry={7}
          fill="none"
          stroke="rgba(232,240,0,0.25)"
          strokeWidth="1.5"
        />

        {/* Cup outline */}
        <path
          d={cupPath}
          transform="translate(0, 6)"
          fill="rgba(232,240,0,0.06)"
          stroke="rgba(232,240,0,0.5)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Handle */}
        <path
          d={handlePath}
          transform="translate(0, 6)"
          fill="none"
          stroke="rgba(232,240,0,0.5)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Coffee fill */}
        <rect
          x={11}
          y={fillY + 6}
          width={cupW - 20}
          height={fillHeight}
          fill="#E8F000"
          opacity={0.9}
          clipPath="url(#cupClip)"
          style={{ transition: 'none' }}
        />

        {/* Surface sheen on fill */}
        {fill > 2 && (
          <ellipse
            cx={cupW / 2}
            cy={fillY + 6}
            rx={(cupW - 24) / 2}
            ry={4}
            fill="rgba(255,255,255,0.15)"
            clipPath="url(#cupClip)"
          />
        )}
      </svg>

      {/* "THE BATCH" text */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: 'clamp(28px, 6vw, 48px)',
          fontWeight: 900,
          letterSpacing: -1,
          color: '#fff',
          lineHeight: 1,
          marginBottom: 6,
          position: 'relative',
          display: 'inline-block',
          overflow: 'hidden',
        }}>
          {/* Reveal text via fill progress */}
          <span style={{ opacity: 0.12 }}>THE BATCH</span>
          <span style={{
            position: 'absolute',
            left: 0,
            top: 0,
            color: '#E8F000',
            clipPath: `inset(0 ${100 - fill}% 0 0)`,
            transition: 'clip-path 0.05s linear',
            whiteSpace: 'nowrap',
          }}>
            THE BATCH
          </span>
        </div>
        <p style={{
          fontSize: 11,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          margin: 0,
          opacity: fill > 50 ? 1 : 0,
          transition: 'opacity 0.5s',
        }}>
          Heraklion, Crete
        </p>
      </div>

      {/* Logo at bottom */}
      

      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 2,
        width: `${fill}%`,
        background: '#E8F000',
        transition: 'none',
      }} />

      <style>{`
        @keyframes steam0 { 0%,100% { transform: translateY(0) scaleX(1); opacity:0.5; } 50% { transform: translateY(-10px) scaleX(1.3); opacity:0.2; } }
        @keyframes steam1 { 0%,100% { transform: translateY(0) scaleX(1); opacity:0.4; } 50% { transform: translateY(-14px) scaleX(0.8); opacity:0.15; } }
        @keyframes steam2 { 0%,100% { transform: translateY(0) scaleX(1); opacity:0.5; } 50% { transform: translateY(-10px) scaleX(1.2); opacity:0.2; } }
      `}</style>
    </div>
  );
}