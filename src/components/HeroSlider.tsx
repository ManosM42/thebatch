import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: navScrolled && !menuOpen ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: navScrolled && !menuOpen ? 'blur(12px)' : 'none',
          boxShadow: navScrolled && !menuOpen ? '0 1px 0 rgba(232,240,0,0.08)' : 'none',
          padding: navScrolled ? '12px 0' : '24px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 flex justify-between items-center">
          {/* Logo — text only */}
          <a
            href="#home"
            onClick={() => setMenuOpen(false)}
            className="no-underline z-50"
            style={styles.logoLink}
          >
            <span style={styles.logoText}>
              TH<span style={styles.logoReversedE}>Ǝ</span>
              {' '}
              <span style={styles.logoBatch}>BATCH</span>
            </span>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-[#E8F000] transition-colors focus:outline-none z-50 p-2 rounded-full hover:bg-white/5"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Full-screen menu */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-center items-center z-40 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-6 md:gap-8 text-center">
          {['Home', 'Menu', 'About', 'Contact'].map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-2xl md:text-4xl font-bold tracking-wide uppercase text-white/80 no-underline transition-all duration-300 hover:text-[#E8F000] hover:scale-105"
              style={{
                transitionDelay: menuOpen ? `${index * 75}ms` : '0ms',
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {item}
            </a>
          ))}

          <a
            href="https://wolt.com/en/grc/heraklion/restaurant/the-batch"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#E8F000] text-[#0a0a0a] py-3.5 px-8 rounded-full text-sm md:text-base font-black tracking-wider no-underline mt-4 transition-all duration-300 hover:opacity-85 shadow-lg shadow-[#E8F000]/10"
            style={{
              transitionDelay: menuOpen ? '300ms' : '0ms',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
            }}
          >
            Order on Wolt →
          </a>
        </div>
      </div>

      {/* Hero Section */}
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

        <div className="relative z-10 w-full max-w-4xl px-6 sm:px-12 md:px-16 lg:px-24">
          <div style={{ ...styles.badge, opacity: animating ? 0 : 1, transform: animating ? 'translateY(10px)' : 'translateY(0)', transition: 'all 0.5s 0.1s' }}>
            <span style={styles.dot} />
            Heraklion, Crete
          </div>

          <h1
            className="font-black leading-[0.95] tracking-tight text-white mb-6"
            style={{
              fontSize: 'clamp(38px, 7vw, 85px)',
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(20px)' : 'translateY(0)',
              transition: 'all 0.6s 0.2s',
            }}
          >
            {s.headline}<br />
            <span style={styles.yellow}>{s.highlight}</span>
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed mb-8 max-w-md"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(16px)' : 'translateY(0)',
              transition: 'all 0.6s 0.3s',
            }}
          >
            {s.sub}
          </p>

          <div style={{ ...styles.btns, opacity: animating ? 0 : 1, transition: 'opacity 0.5s 0.4s' }}>
            <a href="#menu" style={styles.btnPrimary} className="min-h-[44px] flex items-center justify-center">View Menu</a>
            <a href="#findus" style={styles.btnGhost} className="min-h-[44px] flex items-center justify-center">Find Us</a>
          </div>
        </div>

        <div className="absolute bottom-10 left-6 sm:left-12 md:left-16 lg:left-24 z-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                ...styles.dotBtn,
                width: i === current ? 32 : 8,
                background: i === current ? '#E8F000' : 'rgba(255,255,255,0.35)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-9 right-6 sm:right-12 md:right-16 lg:right-24 z-10 flex items-baseline">
          <span className="text-[#E8F000] text-xl sm:text-2xl font-extrabold">0{current + 1}</span>
          <span className="text-white/30 text-xs mx-1.5">/</span>
          <span className="text-white/40 text-xs">0{slides.length}</span>
        </div>

        <div className="hidden sm:flex absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-2.5">
          <div style={styles.scrollLine} />
          <span className="text-[9px] tracking-widest text-white/45 uppercase [writing-mode:vertical-lr]">Scroll</span>
        </div>
      </section>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logoText: {
    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    fontSize: '18px',
    fontWeight: 900,
    letterSpacing: '0.08em',
    color: '#ffffff',
    textTransform: 'uppercase',
    lineHeight: 1,
  },
  logoReversedE: {
    color: '#E8F000',
    display: 'inline-block',
  },
  logoBatch: {
    color: '#E8F000',
  },
  section: {
    position: 'relative',
    height: '100vh',
    minHeight: 600,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  bg: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transform: 'scale(1.02)',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.3) 100%)',
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
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    background: 'rgba(232,240,0,0.12)',
    border: '0.5px solid rgba(232,240,0,0.4)',
    borderRadius: 100,
    padding: '5px 14px',
    fontSize: 10,
    fontWeight: 600,
    color: '#E8F000',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: '#E8F000',
    display: 'inline-block',
  },
  yellow: {
    color: '#E8F000',
  },
  btns: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
  btnPrimary: {
    background: '#E8F000',
    color: '#0a0a0a',
    padding: '12px 28px',
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 700,
    textDecoration: 'none',
    letterSpacing: 0.3,
  },
  btnGhost: {
    background: 'transparent',
    color: '#fff',
    padding: '11px 28px',
    borderRadius: 100,
    fontSize: 13,
    fontWeight: 600,
    textDecoration: 'none',
    border: '0.5px solid rgba(255,255,255,0.3)',
  },
  dotBtn: {
    height: 6,
    borderRadius: 3,
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
  },
  scrollLine: {
    width: 1,
    height: 45,
    background: 'linear-gradient(to bottom, #E8F000, transparent)',
  },
};
