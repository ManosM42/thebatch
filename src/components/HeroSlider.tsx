import { useState, useEffect, useCallback } from 'react';
import { Coffee } from 'lucide-react';
import image from '../assets/slider-1.jpg';
import image2 from '../assets/slider-2.jpg';
import image3 from '../assets/slider-3.jpg';

const slides = [
  {
    image: image,
    headline: 'Every Cup,',
    highlight: 'A Story.',
    sub: 'Specialty coffee crafted with intention — from bean to glass.',
  },
  {
    image: image2,
    headline: 'Bold Flavors,',
    highlight: 'Pure Craft.',
    sub: 'Signature freddo espresso and seasonal drinks made fresh daily.',
  },
  {
    image: image3,
    headline: 'Your Morning',
    highlight: 'Ritual.',
    sub: 'Open every day from 7AM — come as you are.',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = useCallback((next: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
    }, 600);
  }, [animating]);

  useEffect(() => {
    const t = setInterval(() => go((current + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [current, go]);

  const s = slides[current];
  const navScrolled = scrollY > 60;

  return (
    <>
      {/* Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.4s, box-shadow 0.4s, padding 0.4s',
        background: navScrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: navScrolled ? 'blur(12px)' : 'none',
        boxShadow: navScrolled ? '0 1px 0 rgba(232,240,0,0.08)' : 'none',
        padding: navScrolled ? '14px 0' : '24px 0',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo Container */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <Coffee size={22} color="#E8F000" />
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5, color: '#fff' }}>
                The Batch<span style={{ color: '#E8F000' }}>.</span>
              </span>
            </a>
            
            {/* 3D CUP ANCHOR LANDMARK */}
            {/* Positioned safely to the right of your logo branding text with explicit responsive bounding sizing */}
            <div 
              id="cup-anchor-nav" 
              style={{ 
                width: 44, 
                height: 44, 
                display: 'inline-block',
                pointerEvents: 'none',
                userSelect: 'none'
              }} 
            />
          </div>

          {/* Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            {['Home', 'Menu', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E8F000')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >
                {item}
              </a>
            ))}
            <a
              href="https://wolt.com/en/grc/heraklion/restaurant/the-batch"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#E8F000',
                color: '#0a0a0a',
                padding: '9px 22px',
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 0.5,
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Order Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" style={styles.section}>
        {slides.map((slide, i) => (
          <div
            key={i}
            style={{
              ...styles.bg,
              backgroundImage: `url(${slide.image})`,
              opacity: i === current ? 1 : 0,
              transition: 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)',
              zIndex: i === current ? 0 : -1,
            }}
          />
        ))}
        <div style={styles.overlay} />
        <div style={{ ...styles.overlay2, opacity: animating ? 1 : 0 }} />

        <div style={styles.content}>
          <div style={{ ...styles.badge, opacity: animating ? 0 : 1, transform: animating ? 'translateY(10px)' : 'translateY(0)', transition: 'all 0.5s 0.1s' }}>
            <span style={styles.dot} />
            Heraklion, Crete
          </div>

          <h1 style={{ ...styles.h1, opacity: animating ? 0 : 1, transform: animating ? 'translateY(20px)' : 'translateY(0)', transition: 'all 0.6s 0.2s' }}>
            {s.headline}<br />
            <span style={styles.yellow}>{s.highlight}</span>
          </h1>

          <p style={{ ...styles.sub, opacity: animating ? 0 : 1, transform: animating ? 'translateY(16px)' : 'translateY(0)', transition: 'all 0.6s 0.3s' }}>
            {s.sub}
          </p>

          <div style={{ ...styles.btns, opacity: animating ? 0 : 1, transition: 'opacity 0.5s 0.4s' }}>
            <a href="#menu" style={styles.btnPrimary}>View Menu</a>
            <a href="#findus" style={styles.btnGhost}>Find Us</a>
          </div>
        </div>

        <div style={styles.dotsRow}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                ...styles.dotBtn,
                width: i === current ? 36 : 8,
                background: i === current ? '#E8F000' : 'rgba(255,255,255,0.35)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div style={styles.slideNum}>
          <span style={{ color: '#E8F000', fontSize: 22, fontWeight: 800 }}>0{current + 1}</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, margin: '0 6px' }}>/</span>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>0{slides.length}</span>
        </div>

        <div style={styles.scrollCue}>
          <div style={styles.scrollLine} />
          <span style={{ fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Scroll</span>
        </div>
      </section>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    position: 'relative',
    height: '100vh',
    minHeight: 700,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  bg: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transform: 'scale(1.04)',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(110deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.2) 100%)',
    zIndex: 1,
  },
  overlay2: {
    position: 'absolute',
    inset: 0,
    background: '#000',
    zIndex: 2,
    pointerEvents: 'none',
    transition: 'opacity 0.3s',
  },
  content: {
    position: 'relative',
    zIndex: 3,
    padding: '0 80px',
    maxWidth: 780,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: 'rgba(232,240,0,0.12)',
    border: '0.5px solid rgba(232,240,0,0.4)',
    borderRadius: 100,
    padding: '6px 16px',
    fontSize: 11,
    fontWeight: 600,
    color: '#E8F000',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 28,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#E8F000',
    display: 'inline-block',
  },
  h1: {
    fontSize: 'clamp(52px, 7vw, 90px)',
    fontWeight: 900,
    lineHeight: 0.95,
    letterSpacing: -3,
    color: '#fff',
    marginBottom: 24,
  },
  yellow: {
    color: '#E8F000',
  },
  sub: {
    fontSize: 17,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.65,
    marginBottom: 44,
    maxWidth: 440,
  },
  btns: {
    display: 'flex',
    gap: 14,
    flexWrap: 'wrap',
  },
  btnPrimary: {
    background: '#E8F000',
    color: '#0a0a0a',
    padding: '14px 34px',
    borderRadius: 100,
    fontSize: 14,
    fontWeight: 700,
    textDecoration: 'none',
    letterSpacing: 0.3,
  },
  btnGhost: {
    background: 'transparent',
    color: '#fff',
    padding: '13px 34px',
    borderRadius: 100,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: 'none',
    border: '0.5px solid rgba(255,255,255,0.3)',
  },
  dotsRow: {
    position: 'absolute',
    bottom: 44,
    left: 80,
    zIndex: 4,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  dotBtn: {
    height: 8,
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
  },
  slideNum: {
    position: 'absolute',
    bottom: 40,
    right: 80,
    zIndex: 4,
    display: 'flex',
    alignItems: 'baseline',
  },
  scrollCue: {
    position: 'absolute',
    right: 40,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  scrollLine: {
    width: 1,
    height: 60,
    background: 'linear-gradient(to bottom, #E8F000, transparent)',
  },
};