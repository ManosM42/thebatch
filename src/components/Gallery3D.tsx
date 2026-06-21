import { useState, useRef } from 'react';
import image from '../assets/slider-1.jpg';
import image2 from '../assets/slider-2.jpg';
import image3 from '../assets/slider-3.jpg';
import image4 from '../assets/slider-4.jpg';
import image5 from '../assets/slider-5.jpg'; 
import image6 from '../assets/slider-6.jpg';
import image7 from '../assets/slider-7.jpg';
import image8 from '../assets/slider-8.jpg';
import image9 from '../assets/slider-9.jpg';
import image10 from '../assets/slider-10.jpg';

const images = [
  { src: image },
  { src: image2 },
  { src: image3 },
  { src: image4 },
  { src: image5 },
  { src: image6 },
  { src: image7 },
  { src: image8 },
  { src: image9 },
  { src: image10 },
];

export default function Gallery3D() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const n = images.length;

  function getStyle(i: number): React.CSSProperties {
    const offset = ((i - active + n) % n);
    const wrap = offset > n / 2 ? offset - n : offset;
    const absWrap = Math.abs(wrap);

    // Mobile responsive layout values using CSS clamp and math variables
    const z = 300 - absWrap * 85;
    
    // Uses viewport widths on mobile to keep side images from running off-screen
    const x = `calc(${wrap} * clamp(160px, 45vw, 260px))`;
    const rotY = wrap * -15;
    const scale = 1 - absWrap * 0.15;
    
    // Hide images deeper in the stack on mobile to save performance & reduce clutter
    const opacity = absWrap > 1 ? (window.innerWidth < 640 ? 0 : absWrap > 2 ? 0 : 0.4) : 1;

    return {
      position: 'absolute',
      // Dynamically scales width & height based on device size
      width: 'clamp(280px, 75vw, 380px)',
      height: 'clamp(210px, 55vw, 280px)',
      borderRadius: 18,
      overflow: 'hidden',
      left: '50%',
      top: '50%',
      transform: `translate(-50%, -50%) translateX(${x}) translateZ(${z}px) rotateY(${rotY}deg) scale(${scale})`,
      zIndex: Math.round(z),
      opacity,
      cursor: wrap === 0 ? 'default' : 'pointer',
      transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
      boxShadow: wrap === 0 ? '0 25px 50px rgba(0,0,0,0.85), 0 0 0 1px rgba(232,240,0,0.35)' : '0 12px 30px rgba(0,0,0,0.5)',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
    };
  }

  function prev() { setActive((active - 1 + n) % n); }
  function next() { setActive((active + 1) % n); }

  return (
    <section 
      id="gallery" 
      style={{
        ...styles.section,
        backgroundImage: `linear-gradient(to bottom, rgba(13, 13, 13, 0.6), rgba(13, 13, 13, 0.7)), url(${image2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Header Anchor Container */}
      <div style={{
        ...styles.header,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4
      }}>
        <span style={styles.label}>Inside The Batch</span>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          flexWrap: 'wrap-reverse'
        }}>
          <div 
            id="cup-anchor-gallery" 
            style={{ 
              width: 'clamp(60px, 8vw, 100px)', 
              height: 'clamp(60px, 8vw, 100px)',
              pointerEvents: 'none',
              userSelect: 'none'
            }} 
          />
          <h2 style={styles.title}>A Taste of Our World</h2>
        </div>
      </div>

      {/* 3D Stage */}
      <div
        style={styles.stage}
        onMouseDown={e => { setDragging(false); dragStart.current = e.clientX; }}
        onMouseMove={() => setDragging(true)}
        onMouseUp={e => {
          if (!dragging) return;
          const dx = e.clientX - dragStart.current;
          if (Math.abs(dx) > 30) dx < 0 ? next() : prev();
        }}
        onTouchStart={e => { dragStart.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - dragStart.current;
          if (Math.abs(dx) > 30) dx < 0 ? next() : prev();
        }}
      >
        <div style={styles.perspWrap}>
          {images.map((img, i) => (
            <div
              key={i}
              style={getStyle(i)}
              onClick={() => i !== active && setActive(i)}
            >
              <img src={img.src} alt="Gallery item" style={styles.img} />
              <div style={styles.cardOverlay} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Layer */}
      <div style={styles.navRow}>
        <button onClick={prev} style={styles.navBtn} aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div style={styles.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                ...styles.dotBtn,
                width: i === active ? 24 : 6,
                background: i === active ? '#E8F000' : 'rgba(255,255,255,0.3)',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} style={styles.navBtn} aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      {/* Delivery Call to Action */}
      <div style={styles.deliverySection}>
        <p style={styles.deliveryText}>Order for delivery</p>
        <div style={styles.deliveryBtns}>
          <a
            href="https://www.efood.gr"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.efoodBtn}
          >
            <EfoodIcon />
            Order on efood
          </a>
          <a
            href="https://wolt.com/en/grc/heraklion/restaurant/the-batch"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.woltBtn}
          >
            <WoltIcon />
            Order on Wolt
          </a>
        </div>
      </div>
    </section>
  );
}

function EfoodIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#FC3D25"/>
      <text x="20" y="28" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="20" fill="white" textAnchor="middle">e</text>
    </svg>
  );
}

function WoltIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#009DE0"/>
      <circle cx="20" cy="20" r="9" stroke="white" strokeWidth="3" fill="none"/>
      <circle cx="20" cy="20" r="3.5" fill="white"/>
    </svg>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '80px 0 60px',
    overflow: 'hidden',
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
    padding: '0 16px',
  },
  label: {
    display: 'inline-block',
    fontSize: 10,
    letterSpacing: 3,
    textTransform: 'uppercase' as const,
    color: '#E8F000',
    fontWeight: 700,
    marginBottom: 8,
  },
  title: {
    fontSize: 'clamp(28px, 5vw, 48px)',
    fontWeight: 800,
    color: '#fff',
    letterSpacing: -1,
    margin: 0,
    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
  },
  stage: {
    height: 'clamp(240px, 60vw, 360px)',
    position: 'relative',
    cursor: 'grab',
    userSelect: 'none',
    touchAction: 'pan-y', // Prevents full-screen scroll hijacking when swiping horizontally
  },
  perspWrap: {
    perspective: 1000,
    perspectiveOrigin: '50% 50%',
    width: '100%',
    height: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    pointerEvents: 'none',
  },
  cardOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
  },
  navRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginTop: 24,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: '0.5px solid rgba(255,255,255,0.2)',
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
  },
  dots: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  dotBtn: {
    height: 6,
    borderRadius: 3,
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.3s ease',
  },
  deliverySection: {
    textAlign: 'center',
    marginTop: 44,
    padding: '36px 16px 0',
    borderTop: '0.5px solid rgba(255,255,255,0.15)',
  },
  deliveryText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
    marginBottom: 16,
    fontWeight: 600,
  },
  deliveryBtns: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  efoodBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#FC3D25',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: 100,
    fontWeight: 700,
    fontSize: 13,
    textDecoration: 'none',
    transition: 'opacity 0.2s',
    boxShadow: '0 4px 12px rgba(252,61,37,0.2)'
  },
  woltBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#009DE0',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: 100,
    fontWeight: 700,
    fontSize: 13,
    textDecoration: 'none',
    transition: 'opacity 0.2s',
    boxShadow: '0 4px 12px rgba(0,157,224,0.2)'
  },
};