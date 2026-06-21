import { Coffee, Clock, Star } from 'lucide-react';
import { useState, useCallback } from 'react';
import Menu from './components/Menu';
import HeroSlider from './components/HeroSlider';
import Reviews from './components/Reviews';
import Gallery3D from './components/Gallery3D';
import FindUs from './components/FindUs';
import LoadingScreen from './components/LoadingScreen';
import FlyingCupController from './components/FlyingCupController'; // Imported Controller

function App() {
  const [loading, setLoading] = useState(true);
  const handleDone = useCallback(() => setLoading(false), []);

  return (
    <div className="min-h-screen bg-black text-white">
      {loading && <LoadingScreen onDone={handleDone} />}

      <HeroSlider />

      <Menu />

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              
              {/* Enhanced Flex Wrapper to host the tracking cup anchor */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                flexWrap: 'wrap'
              }}>
                <h2 className="text-5xl md:text-6xl font-bold" style={{ color: '#E8F000' }}>
                  About Us
                </h2>
                
                {/* 3D ABOUT ANCHOR - Set safely clear of title bounds */}
                <div 
                  id="cup-anchor-about" 
                  style={{ 
                    width: 'clamp(70px, 10vw, 110px)', 
                    height: 'clamp(70px, 10vw, 110px)',
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }} 
                />
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                At The Batch Spot, we believe coffee is more than just a beverage—it's an experience.
                Since our founding, we've been dedicated to sourcing the finest beans and crafting each cup
                with precision and care.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our expert baristas combine traditional techniques with modern innovation to create
                drinks that delight and inspire. From our signature Freddo Espresso to classic favorites,
                every item on our menu is crafted to perfection.
              </p>
              
              <div className="grid grid-cols-3 gap-6 pt-6">
                {[
                  { icon: Coffee, label: 'Premium Beans' },
                  { icon: Star, label: 'Expert Baristas' },
                  { icon: Clock, label: 'Fresh Daily' },
                ].map((feature) => (
                  <div key={feature.label} className="text-center group hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-12 h-12 mx-auto mb-2 group-hover:rotate-12 transition-transform duration-300" style={{ color: '#E8F000' }} />
                    <p className="text-sm text-gray-400 group-hover:transition-colors duration-300">
                      {feature.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className="aspect-square rounded-3xl overflow-hidden border transition-all duration-500 hover:rotate-2 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(232,240,0,0.12) 0%, rgba(232,240,0,0.04) 100%)',
                  borderColor: 'rgba(232,240,0,0.25)',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/src/assets/the-batch-logo.jpg"
                    alt="The Batch"
                    className="w-2/3 opacity-20"
                    style={{ filter: 'saturate(1.4)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Gallery3D />

      <Reviews />

      {/* Container wrapper ensuring the target coordinate mapper captures 'cup-anchor-findus' seamlessly */}
      <div id="cup-anchor-findus" style={{ position: 'relative' }}>
        <FindUs />
      </div>

      {/* Footer */}
      <footer style={{ background: '#0a0a0a', borderTop: '1px solid rgba(232,240,0,0.08)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 48px 40px' }}>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40, marginBottom: 48 }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <img
                src="/src/assets/the-batch-logo.jpg"
                alt="The Batch"
                style={{ width: 130, borderRadius: 8, display: 'block' }}
              />
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', maxWidth: 220, lineHeight: 1.65, margin: 0 }}>
                Specialty coffee crafted with intention — from bean to glass. Heraklion, Crete.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' as const, color: '#E8F000', fontWeight: 700, marginBottom: 16, marginTop: 0 }}>Navigate</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[['Home', '#home'], ['Menu', '#menu'], ['About', '#about'], ['Find Us', '#findus'], ['Contact', '#contact']].map(([label, href]) => (
                    <a key={label} href={href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#E8F000')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' as const, color: '#E8F000', fontWeight: 700, marginBottom: 16, marginTop: 0 }}>Visit</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>Στυλιανοῦ Γιαμαλάκη 50<br />Ηράκλειο 712 02</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Mon–Sat: 7AM–5PM</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Sun: 7AM–9PM</span>
                  <a href="tel:+302810223308" style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#E8F000')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
                    (+30) 2810 223308
                  </a>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
              <p style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' as const, color: '#E8F000', fontWeight: 700, margin: 0 }}>Order Online</p>
              <a
                href="https://wolt.com/en/grc/heraklion/restaurant/the-batch"
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: '#E8F000', color: '#0a0a0a', padding: '11px 28px', borderRadius: 100, fontSize: 13, fontWeight: 800, textDecoration: 'none', letterSpacing: 0.3 }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Order on Wolt →
              </a>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', margin: 0 }}>© 2026 The Batch. All rights reserved.</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', margin: 0 }}>Crafted with love and coffee ☕</p>
          </div>
        </div>
      </footer>

      {/* GLOBAL CONTROLLER INJECTION LAYER */}
      <FlyingCupController />
    </div>
  );
}

export default App;