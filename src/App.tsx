import { Coffee, Clock, Star } from 'lucide-react';
import { useState, useCallback } from 'react';
import Menu from './components/Menu';
import HeroSlider from './components/HeroSlider';
import Reviews from './components/Reviews';
import Gallery3D from './components/Gallery3D';
import FindUs from './components/FindUs';
import LoadingScreen from './components/LoadingScreen';
import logoImg from './assets/the-batch-logo.jpg'; 

function App() {
  const [loading, setLoading] = useState(true);
  const handleDone = useCallback(() => setLoading(false), []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {loading && <LoadingScreen onDone={handleDone} />}

      {/* Main Hero Slider and Navigation Layer */}
      <HeroSlider />

      {/* Restaurant Menu Grid */}
      <Menu />

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-neutral-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div className="space-y-6">
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                flexWrap: 'wrap'
              }}>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold" style={{ color: '#E8F000' }}>
                  About Us
                </h2>
              </div>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                At The Batch Spot, we believe coffee is more than just a beverage—it's an experience.
                Since our founding, we've been dedicated to sourcing the finest beans and crafting each cup
                with precision and care.
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                Our expert baristas combine traditional techniques with modern innovation to create
                drinks that delight and inspire. From our signature Freddo Espresso to classic favorites,
                every item on our menu is crafted to perfection.
              </p>
              
              {/* Responsive feature columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 md:pt-6">
                {[
                  { icon: Coffee, label: 'Premium Beans' },
                  { icon: Star, label: 'Expert Baristas' },
                  { icon: Clock, label: 'Fresh Daily' },
                ].map((feature) => (
                  <div key={feature.label} className="text-center group sm:hover:scale-110 transition-transform duration-300 flex sm:flex-col items-center sm:justify-center gap-4 sm:gap-0 bg-neutral-900/40 sm:bg-transparent p-4 sm:p-0 rounded-2xl">
                    <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 sm:mx-auto sm:mb-2 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" style={{ color: '#E8F000' }} />
                    <p className="text-sm text-gray-300 sm:text-gray-400 group-hover:transition-colors duration-300 font-medium sm:font-normal">
                      {feature.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo container */}
            <div className="relative mt-6 md:mt-0 max-w-md mx-auto w-full">
              <div
                className="aspect-square rounded-3xl overflow-hidden border transition-all duration-500 sm:hover:rotate-2 sm:hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(232,240,0,0.12) 0%, rgba(232,240,0,0.04) 100%)',
                  borderColor: 'rgba(232,240,0,0.25)',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={logoImg}
                    alt="The Batch"
                    className="w-1/2 md:w-2/3 opacity-20"
                    style={{ filter: 'saturate(1.4)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Gallery Layout */}
      <Gallery3D />

      {/* Customer Reviews Section */}
      <Reviews />

      {/* Maps Wrapper */}
      <FindUs />

      {/* Responsive Utilities Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-14">

          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-6 mb-12">

            {/* Brand details */}
            <div className="flex flex-col gap-4">
              <img
                src={logoImg}
                alt="The Batch"
                className="w-28 rounded-lg block"
              />
              <p className="text-xs md:text-sm text-white/35 max-w-xs leading-relaxed m-0">
                Specialty coffee crafted with intention — from bean to glass. Heraklion, Crete.
              </p>
            </div>

            {/* Navigation and Visit links */}
            <div className="flex gap-12 sm:gap-16 flex-wrap w-full lg:w-auto">
              <div>
                <p className="text-[10px] tracking-widest uppercase text-[#E8F000] font-bold mb-4 mt-0">Navigate</p>
                <div className="flex flex-col gap-2.5">
                  {[['Home', '#home'], ['Menu', '#menu'], ['About', '#about'], ['Find Us', '#findus'], ['Contact', '#contact']].map(([label, href]) => (
                    <a key={label} href={href} className="text-xs md:text-sm text-white/45 no-underline transition-colors duration-200 hover:text-[#E8F000]">
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] tracking-widest uppercase text-[#E8F000] font-bold mb-4 mt-0">Visit</p>
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs md:text-sm text-white/45 leading-relaxed">Στυλιανοῦ Γιαμαλάκη 50<br />Ηράκλειο 712 02</span>
                  <span className="text-xs md:text-sm text-white/45">Mon–Sat: 7AM–5PM</span>
                  <span className="text-xs md:text-sm text-white/45">Sun: 7AM–9PM</span>
                  <a href="tel:+302810223308" className="text-xs md:text-sm text-white/45 no-underline transition-colors duration-200 hover:text-[#E8F000]">
                    (+30) 2810 223308
                  </a>
                </div>
              </div>
            </div>

            {/* Delivery Links Button */}
            <div className="flex flex-col gap-3.5 items-start w-full sm:w-auto">
              <p className="text-[10px] tracking-widest uppercase text-[#E8F000] font-bold m-0">Order Online</p>
              <a
                href="https://wolt.com/en/grc/heraklion/restaurant/the-batch"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E8F000] text-[#0a0a0a] py-3 px-8 rounded-full text-xs md:text-sm font-extrabold no-underline tracking-wide hover:opacity-85 transition-opacity duration-200 min-h-[44px] flex items-center justify-center"
              >
                Order on Wolt →
              </a>
            </div>
          </div>

          {/* Sub-footer Copyright adjustments */}
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-xs text-white/20 m-0">© 2026 The Batch. All rights reserved.</p>
            <p className="text-xs text-white/20 m-0">Crafted with love and coffee ☕</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;