import { useRef, useState, useEffect } from 'react';
import reviewsBg from '../assets/slider-10.jpg'; // Imported your background asset

const reviews = [
  { name: 'Maria K.', init: 'MK', text: 'Best freddo espresso in Heraklion — creamy, strong and perfectly balanced. I come here every single morning.', stars: 5, date: 'May 2025', via: 'Google' },
  { name: 'Nikos P.', init: 'NP', text: 'Love the vibe here. The cappuccino is exceptional and the staff always makes you feel genuinely welcome.', stars: 5, date: 'April 2025', via: 'Google' },
  { name: 'Elena V.', init: 'EV', text: 'The avocado toast and cold brew combo is unmatched anywhere else. An absolute hidden gem in the city.', stars: 5, date: 'June 2025', via: 'Google' },
  { name: 'Dimitris A.', init: 'DA', text: 'Came in for a quick coffee and ended up staying two hours. The atmosphere and the mocha are just perfect.', stars: 5, date: 'May 2025', via: 'Google' },
  { name: 'Sofia M.', init: 'SM', text: 'Ordered on Wolt and it arrived quickly. The freddo cappuccino was still cold and absolutely delicious.', stars: 5, date: 'March 2025', via: 'Wolt' },
  { name: 'Kostas L.', init: 'KL', text: 'The affogato is phenomenal. Rich espresso poured over the creamiest vanilla ice cream — a must-try.', stars: 5, date: 'June 2025', via: 'Google' },
  { name: 'Anna T.', init: 'AT', text: 'Friendly baristas, great music and an incredible latte. This is my absolute go-to spot every weekend.', stars: 5, date: 'April 2025', via: 'Google' },
  { name: 'Petros G.', init: 'PG', text: 'Tried the cold brew for the first time here — smooth and never bitter. Now I am completely obsessed.', stars: 5, date: 'May 2025', via: 'efood' },
];

const CARD_WIDTH = 320;
const GAP = 20;

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  const totalWidth = (CARD_WIDTH + GAP) * reviews.length;

  useEffect(() => {
    let last = 0;
    const speed = 0.6;

    const step = (ts: number) => {
      if (last === 0) last = ts;
      const dt = ts - last;
      last = ts;

      if (!paused) {
        posRef.current += speed * (dt / 16);
        if (posRef.current >= totalWidth) posRef.current -= totalWidth;
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${-posRef.current}px)`;
        }
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [paused, totalWidth]);

  const doubled = [...reviews, ...reviews];

  const viaColors: Record<string, string> = {
    Google: '#4285F4',
    Wolt: '#009DE0',
    efood: '#FC3D25',
  };

  return (
    <section 
      id="reviews" 
      style={{
        ...styles.section,
        backgroundImage: `linear-gradient(to bottom, rgba(13, 13, 13, 0.88), rgba(13, 13, 13, 0.92)), url(${reviewsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // Parallax scrolling effect
      }}
    >
      <div style={styles.inner}>
        <div style={styles.header}>
          <span style={styles.eyebrow}>What people say</span>
          <h2 style={styles.title}>Reviews</h2>
          <p style={styles.sub}>
            {paused ? (
              <span style={{ color: '#E8F000' }}>⏸ Paused — click again to resume</span>
            ) : (
              'Click the slider to pause'
            )}
          </p>
        </div>
      </div>

      {/* Track */}
      <div style={styles.trackOuter}>
        <div style={{...styles.fadeLeft, background: 'linear-gradient(to right, rgba(13,13,13,0.85), transparent)'}} />
        <div style={{...styles.fadeRight, background: 'linear-gradient(to left, rgba(13,13,13,0.85), transparent)'}} />
        <div
          style={styles.trackClip}
          onClick={() => setPaused(p => !p)}
          title={paused ? 'Click to resume' : 'Click to pause'}
        >
          <div ref={trackRef} style={styles.track}>
            {doubled.map((r, i) => (
              <div key={i} style={styles.card}>
                <div style={styles.cardTop}>
                  <div style={styles.stars}>{'★'.repeat(r.stars)}</div>
                  <span style={{ ...styles.viaBadge, background: viaColors[r.via] || '#555' }}>{r.via}</span>
                </div>
                <p style={styles.text}>"{r.text}"</p>
                <div style={styles.author}>
                  <div style={styles.avatar}>{r.init}</div>
                  <div>
                    <div style={styles.authorName}>{r.name}</div>
                    <div style={styles.authorDate}>{r.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rating summary */}
      <div style={styles.summary}>
        <div style={styles.ratingBig}>4.9</div>
        <div style={styles.ratingStars}>★★★★★</div>
        <div style={styles.ratingLabel}>Based on 200+ reviews</div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '100px 0 80px',
    overflow: 'hidden',
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 48px',
  },
  header: {
    textAlign: 'center',
    marginBottom: 56,
  },
  eyebrow: {
    display: 'inline-block',
    fontSize: 11,
    letterSpacing: 3,
    textTransform: 'uppercase' as const,
    color: '#E8F000',
    fontWeight: 600,
    marginBottom: 14,
  },
  title: {
    fontSize: 'clamp(36px,5vw,52px)',
    fontWeight: 800,
    color: '#fff',
    letterSpacing: -1.5,
    margin: '0 0 12px',
  },
  sub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.45)',
    margin: 0,
    minHeight: 20,
  },
  trackOuter: {
    position: 'relative',
  },
  fadeLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 120,
    zIndex: 2,
    pointerEvents: 'none',
  },
  fadeRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 120,
    zIndex: 2,
    pointerEvents: 'none',
  },
  trackClip: {
    overflow: 'hidden',
    cursor: 'pointer',
  },
  track: {
    display: 'flex',
    gap: GAP,
    padding: '12px 0 24px',
    willChange: 'transform',
  },
  card: {
    flexShrink: 0,
    width: CARD_WIDTH,
    background: 'rgba(22, 22, 22, 0.65)',
    backdropFilter: 'blur(8px)',
    border: '0.5px solid rgba(255,255,255,0.12)',
    borderRadius: 16,
    padding: '24px 26px',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stars: {
    color: '#E8F000',
    fontSize: 15,
    letterSpacing: 2,
  },
  viaBadge: {
    fontSize: 10,
    fontWeight: 700,
    color: '#fff',
    padding: '3px 9px',
    borderRadius: 100,
    letterSpacing: 0.5,
  },
  text: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.65,
    margin: 0,
    flex: 1,
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    paddingTop: 4,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    background: 'rgba(232,240,0,0.15)',
    border: '0.5px solid rgba(232,240,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 700,
    color: '#E8F000',
    flexShrink: 0,
  },
  authorName: {
    fontSize: 13,
    fontWeight: 700,
    color: '#fff',
  },
  authorDate: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
    marginTop: 2,
  },
  summary: {
    textAlign: 'center',
    marginTop: 52,
    paddingTop: 48,
    borderTop: '0.5px solid rgba(255,255,255,0.12)',
  },
  ratingBig: {
    fontSize: 56,
    fontWeight: 900,
    color: '#fff',
    letterSpacing: -2,
    lineHeight: 1,
  },
  ratingStars: {
    color: '#E8F000',
    fontSize: 22,
    letterSpacing: 4,
    margin: '10px 0 8px',
  },
  ratingLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: 0.5,
  },
};