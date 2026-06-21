import { MapPin, Clock, Phone } from 'lucide-react';
import findUsBg from '../assets/slider-2.jpg'; // Imported your background asset

const Y = '#E8F000';

export default function FindUs() {
  return (
    <>
      {/* Find Us Section */}
      <section 
        id="findus" 
        style={{
          padding: '80px 24px',
          // Toned down overlay opacity from 0.9/0.85 to 0.45/0.55 to reveal the background image
          backgroundImage: `linear-gradient(to bottom, rgba(13, 13, 13, 0.45), rgba(13, 13, 13, 0.55)), url(${findUsBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // Parallax effect
        }}
      >
        <div style={styles.container}>
          <div style={styles.header}>
            <h2 style={styles.title}>Find Us</h2>
            <p style={styles.sub}>Brewing happiness at our location</p>
          </div>

          <div
            style={styles.mapWrapper}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 60px rgba(232,240,0,0.35)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 40px rgba(232,240,0,0.15)')}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1004.0984851827893!2d25.12997169850469!3d35.34129000761349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDIwJzI4LjY0Ik4gMjXCsDA3JDU5LjEwIkU!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section 
        id="contact" 
        style={{
          padding: '80px 24px',
          // Toned down overlay opacity from 0.85/0.95 to 0.45/0.55 to match the lighter theme
          backgroundImage: `linear-gradient(to bottom, rgba(13, 13, 13, 0.45), rgba(13, 13, 13, 0.55)), url(${findUsBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // Parallax effect
        }}
      >
        <div style={styles.container}>
          <div style={styles.header}>
            <h2 style={styles.title}>Visit Us</h2>
            <p style={styles.sub}>We'd love to serve you</p>
          </div>

          <div style={styles.grid}>
            {[
              { icon: MapPin, title: 'Location', info: 'Στυλιανοῦ καί Νικολάου Γιαμαλάκη 50, Ηράκλειο 712 02' },
              { icon: Clock, title: 'Hours', info: 'Mon-Sat: 7AM-5PM\nSun: 7AM-9PM' },
              { icon: Phone, title: 'Contact', info: '(+30) 2810223308\nhello@batchspot.com' },
            ].map((item) => (
              <div
                key={item.title}
                style={styles.card}
                onMouseEnter={e => {
                  e.currentTarget.style.border = '1px solid rgba(232,240,0,0.5)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(232,240,0,0.2)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = '1px solid rgba(232,240,0,0.15)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <item.icon style={styles.icon} />
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardInfo}>{item.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 1200,
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: 56,
  },
  title: {
    fontSize: 'clamp(40px, 5vw, 56px)',
    fontWeight: 800,
    color: Y,
    letterSpacing: -1.5,
    margin: '0 0 12px',
    textShadow: '0 2px 10px rgba(0,0,0,0.6)',
  },
  sub: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)', // Heightened text contrast against brightened image
    margin: 0,
    textShadow: '0 1px 4px rgba(0,0,0,0.6)',
  },
  mapWrapper: {
    position: 'relative',
    borderRadius: 24,
    overflow: 'hidden',
    border: '1.5px solid rgba(232,240,0,0.3)',
    boxShadow: '0 0 40px rgba(232,240,0,0.15)',
    transition: 'box-shadow 0.4s ease',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 32,
  },
  card: {
    textAlign: 'center',
    padding: '40px 32px',
    borderRadius: 20,
    background: 'rgba(12, 12, 12, 0.75)', // Slightly cleaner dark background block
    backdropFilter: 'blur(12px)', // Increased blur to separate text layers nicely
    border: '1px solid rgba(232,240,0,0.15)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  icon: {
    width: 40,
    height: 40,
    margin: '0 auto 20px',
    color: Y,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 12px',
  },
  cardInfo: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)', // Heightened text contrast
    whiteSpace: 'pre-line',
    lineHeight: 1.6,
    margin: 0,
  },
};