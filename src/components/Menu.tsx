import { useState, useRef } from 'react';
import menuBg from '../assets/slider-4.jpg';

const Y = '#E8F000';

const menuData = [
  {
    section: 'ΚΑΦΕΔΕΣ',
    label: 'Coffee',
    emoji: '',
    note: 'Project AREA 51 Artisan Coffee Roasters — specialty grade, single origin',
    items: [
      { name: 'Espresso', price: '€2.60' },
      { name: 'Espresso Double', price: '€2.90' },
      { name: 'Espresso Americano', price: '€2.60' },
      { name: 'Freddo Espresso', price: '€3.00', popular: true },
      { name: 'Cappuccino', price: '€3.00', popular: true },
      { name: 'Cappuccino Double', price: '€3.80', popular: true },
      { name: 'Freddo Cappuccino', price: '€3.00', popular: true },
      { name: 'Freddo Latte', price: '€3.40' },
      { name: 'Flat White', price: '€4.00' },
      { name: 'Latte', price: '€4.00' },
      { name: 'Cold Brew "The Batch"', price: '€5.00' },
      { name: 'Ελληνικός', price: '€3.00' },
      { name: 'Ελληνικός Διπλός', price: '€3.50' },
    ],
  },
  {
    section: 'SALTY TREATS',
    label: 'Salty Treats',
    emoji: '',
    note: 'Τα πιο φρέσκα και γευστικά υλικά — αρτοσκευάσματα και snacks',
    items: [
      { name: 'Sandwich Γαλοπούλα', price: '€5.00', desc: 'Γαλοπούλα, τυρί, ντομάτα, iceberg, μαγιονέζα lime' },
      { name: 'Sandwich Fuego', price: '€5.30', desc: 'Χοιρινό fuego, τυρί, ντομάτα, iceberg, μαγιονέζα πάπρικα' },
      { name: 'Κουλούρι Κοχύλι', price: '€6.60', desc: 'Σολομός, αβοκάντο, κρέμα τυρί', popular: true },
      { name: 'Κουλούρι Γαλοπούλα', price: '€3.20', desc: 'Γαλοπούλα και τυρί κρέμα' },
    ],
  },
  {
    section: 'SWEET TREATS',
    label: 'Sweet Treats',
    emoji: '',
    items: [
      { name: 'Cookies Chocolate', price: '€4.00' },
      { name: 'Cookies Peanut Butter', price: '€4.00' },
      { name: 'Banana Bread', price: '€3.70' },
    ],
  },
  {
    section: 'BRUNCH',
    label: 'Brunch',
    emoji: '',
    items: [
      { name: 'Scrambled Eggs', price: '€9.30', desc: 'Προζυμένιο ψωμί, μπέικον, ντομάτα, μανούρι', popular: true },
      { name: 'Scrambled Eggs Τρούφας', price: '€11.50', desc: 'Προζυμένιο ψωμί, παρμεζάνα, λάδι τρούφας' },
      { name: 'Croque Madame', price: '€13.00', desc: 'Brioche, μπεσαμέλ, fuego, γκούντα, 2 τηγανητά αυγά, προσούτο', popular: true },
      { name: 'Κουακερόπιτα', price: '€10.80', desc: 'Μήλο, berries, μέλι και κανέλα' },
      { name: 'Ομελέτα Λαχανικών', price: '€10.50', desc: 'Κρεμμύδι, πιπεριά, κολοκύθι, ντομάτα — με σαλάτα' },
      { name: 'Ομελέτα Special', price: '€13.00', desc: 'Κοτόπουλο, μπέικον, ντομάτα — με σαλάτα' },
      { name: 'Muffin Benedict', price: '€13.50', desc: 'Γιαούρτι μυρωδικών, μπέικον, 2 ποσέ αυγά, σως Ολλανδέζ' },
      { name: 'Truffle Muffin', price: '€13.50', desc: 'Μαγιονέζα τρούφας, μπέικον, τσένταρ, τηγανητό αυγό — με πατάτες' },
      { name: 'Αλμυρό Pancake', price: '€14.00', desc: 'Μαγιονέζα, γκούντα, fuego, μπέικον, σως Ολλανδέζ, τηγανητό αυγό' },
      { name: 'Oreo Pancake', price: '€9.50' },
      { name: 'Lotus Pancake', price: '€11.50' },
      { name: 'Λευκή Σοκολάτα Pancake', price: '€9.50' },
      { name: 'Μέλι Μπανάνα Καρύδι Pancake', price: '€9.50' },
      { name: 'Φυστίκι & Λευκή Σοκολάτα Pancake', price: '€12.00' },
      { name: 'French Toast Τσουρέκι', price: '€10.50', desc: 'Φυστικοβούτυρο & κρέμα βανίλια' },
    ],
  },
  {
    section: 'HEALTHY',
    label: 'Healthy',
    emoji: '',
    items: [
      { name: 'Yogurt Μέλι και Καρύδι', price: '€7.20', desc: '200gr στραγγιστό γιαούρτι, μέλι, παστέλι, καρύδια, πράσινο μήλο, μαύρη σοκολάτα, κανέλα' },
      { name: 'Overnight Oats', price: '€7.20', desc: 'Βρώμη, σπόροι τσία, γάλα αμυγδάλου, γιαούρτι, χουρμάς, μέλι' },
      { name: 'Γιαούρτι Bowl', price: '€7.80', desc: 'Γκρανόλα, φυστικοβούτυρο, φρούτα εποχής', popular: true },
      { name: 'Protein Ball Red Fruits', price: '€4.00', desc: 'Αμυγδαλοβούτυρο, φιστικοβούτυρο, φουντουκοβούτυρο, πρωτεΐνη, φράουλα μαρμελάδα, σπόροι, βρώμη' },
      { name: 'Protein Ball Banana', price: '€4.00', desc: 'Αμυγδαλοβούτυρο, λιναρόσπορος, αλεύρι βρώμης, πρωτεΐνη' },
    ],
  },
  {
    section: 'MAINS',
    label: 'Mains',
    emoji: '',
    items: [
      { name: 'Caesar με Προσούτο', price: '€9.60', desc: 'Πράσινη σαλάτα, κρουτόν, κοτόπουλο, Caesar sauce, προσούτο' },
      { name: 'Club Sandwich Chicken', price: '€13.50', desc: 'Μαγιονέζα, Gouda, γαλοπούλα, κοτόπουλο, μπέικον, ντομάτα, iceberg — με πατάτες' },
      { name: 'Club Sandwich Fuego', price: '€10.80', desc: 'Μαγιονέζα, Gouda, fuego, μπέικον, ντομάτα, iceberg — με πατάτες' },
      { name: 'Chicken Sando', price: '€14.00', desc: 'Milk bread, sweet chilli mayo, coleslaw, πανέ κοτόπουλο — με πατάτες' },
      { name: 'Burger', price: '€14.50', desc: 'Potato bun, μοσχαρίσιος κιμάς, τσένταρ, μπέικον, σως — με πατάτες' },
    ],
  },
  {
    section: 'SMOOTHIES',
    label: 'Smoothies',
    emoji: '',
    note: 'Yum Tales — no added sugar',
    items: [
      { name: 'Smoothie Orange', price: '€6.00', desc: 'Πορτοκάλι, mango, μπανάνα, ανανάς, μήλο' },
      { name: 'Smoothie Banana', price: '€6.00', desc: 'Μπανάνα, ανανάς, μήλο, καρύδα' },
      { name: 'Smoothie Strawberry', price: '€6.00', desc: 'Φράουλα, raspberry, μπανάνα, μήλο' },
      { name: 'Smoothie Kiwi', price: '€6.00', desc: 'Ακτινίδιο, σπανάκι, μήλο, αχλάδι, μπανάνα, ανανάς' },
      { name: 'Smoothie Apple', price: '€6.00', desc: 'Μήλο, μπανάνα, καρότο, παντζάρι' },
      { name: 'Smoothie Apricot', price: '€6.00', desc: 'Βερύκοκο, μπανάνα, καρότο' },
    ],
  },
  {
    section: 'DRINKS',
    label: 'Drinks',
    emoji: '',
    items: [
      { name: 'Σοκολάτα Ζεστή', price: '€4.50' },
      { name: 'Σοκολάτα Κρύα', price: '€4.50' },
      { name: 'Matcha Tea', price: '€4.00' },
      { name: 'Matcha Latte', price: '€4.50' },
      { name: 'Mochaccino', price: '€5.00' },
      { name: 'Φυσικός Χυμός Πορτοκάλι', price: '€4.00', popular: true },
      { name: 'Σπιτική Λεμονάδα', price: '€4.50' },
      { name: 'Σπιτικό Παγωμένο Τσάι Πράσινο', price: '€4.00' },
      { name: 'Σπιτικό Παγωμένο Τσάι Κόκκινο', price: '€4.00' },
      { name: 'Ζεστό Τσάι', price: '€3.00' },
      { name: 'Coca-Cola 0.33l', price: '€2.50' },
      { name: 'Coca-Cola Zero 0.33l', price: '€2.50' },
      { name: 'Νερό 0.5l', price: '€1.00' },
    ],
  },
  {
    section: 'COCKTAILS',
    label: 'Cocktails',
    emoji: '',
    note: '18+ — 40% vol',
    items: [
      { name: 'Mai Tai', price: '€8.00' },
      { name: 'Flower Spritz', price: '€8.00' },
      { name: 'Paloma', price: '€8.00' },
      { name: 'Blossom Spritz', price: '€8.00' },
      { name: 'Aperol', price: '€8.00' },
      { name: 'Negroni', price: '€8.00' },
    ],
  },
  {
    section: 'OFFERS',
    label: 'Offers',
    emoji: '',
    items: [
      { name: '1 Freddo Espresso + 1 Banana Bread', price: '€5.00', desc: 'Κανονική τιμή €6.70', popular: true },
    ],
  },
];

type Item = { name: string; price: string; desc?: string; popular?: boolean };
type Section = { section: string; label: string; emoji: string; note?: string; items: Item[] };

export default function Menu() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const dragStart = useRef<number | null>(null);
  const dragScrollLeft = useRef(0);
  const isDragging = useRef(false);

  const selectSection = (i: number) => {
    if (i === activeIndex || animating) return;
    setAnimating(true);
    setActiveIndex(i);
    setTimeout(() => {
      setAnimating(false);
    }, 420);

    const slider = sliderRef.current;
    if (slider) {
      const btn = slider.children[i] as HTMLElement;
      if (btn) {
        const offset = btn.offsetLeft - slider.offsetWidth / 2 + btn.offsetWidth / 2;
        slider.scrollTo({ left: offset, behavior: 'smooth' });
      }
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = false;
    dragStart.current = e.pageX - (sliderRef.current?.offsetLeft ?? 0);
    dragScrollLeft.current = sliderRef.current?.scrollLeft ?? 0;
    sliderRef.current!.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (dragStart.current === null) return;
    const x = e.pageX - (sliderRef.current?.offsetLeft ?? 0);
    const walk = x - dragStart.current;
    if (Math.abs(walk) > 4) isDragging.current = true;
    if (sliderRef.current) sliderRef.current.scrollLeft = dragScrollLeft.current - walk;
  };

  const onMouseUp = () => {
    dragStart.current = null;
    if (sliderRef.current) sliderRef.current.style.cursor = 'grab';
  };

  const sec = menuData[activeIndex] as Section;

  return (
    <section 
      id="menu" 
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.75)), url(${menuBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '80px 0 60px' 
      }}
    >
      <style>{`
        .menu-tab-bar::-webkit-scrollbar { display: none; }
        .menu-tab-bar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes itemSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sectionFadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 16px' }}>

        {/* Header Title Layer */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={{ display: 'inline-block', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: Y, fontWeight: 700, marginBottom: 8 }}>
            What we serve
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 6vw, 54px)', fontWeight: 900, color: '#fff', letterSpacing: -1.5, margin: '0 0 8px', lineHeight: 1.1 }}>
            Our Menu
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
            Crafted fresh, served with intention
          </p>
        </div>

        {/* Sticky horizontal swipe menu tabs */}
        <div style={{ position: 'relative', marginBottom: 24, mx: '-16px' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to right, rgba(10,10,10,0.8), transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to left, rgba(10,10,10,0.8), transparent)', zIndex: 2, pointerEvents: 'none' }} />

          <div
            ref={sliderRef}
            className="menu-tab-bar"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            style={{
              display: 'flex',
              gap: 8,
              overflowX: 'auto',
              padding: '4px 20px 12px',
              cursor: 'grab',
              userSelect: 'none',
              touchAction: 'pan-x'
            }}
          >
            {menuData.map((s, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={s.section}
                  onClick={() => { if (!isDragging.current) selectSection(i); }}
                  style={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 18px',
                    borderRadius: 100,
                    border: `1px solid ${isActive ? Y : 'rgba(255,255,255,0.15)'}`,
                    background: isActive ? Y : 'rgba(20,20,20,0.7)',
                    color: isActive ? '#0a0a0a' : 'rgba(255,255,255,0.85)',
                    fontSize: 13,
                    fontWeight: isActive ? 800 : 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)'
                  }}
                >
                  <span>{s.emoji}</span>
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Central Display Card */}
        <div
          key={activeIndex}
          style={{
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(15,15,15,0.85)', 
            backdropFilter: 'blur(16px)', 
            WebkitBackdropFilter: 'blur(16px)',
            overflow: 'hidden',
            animation: 'sectionFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}
        >
          {/* Section Description Bar */}
          <div style={{
            padding: '20px 20px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <span style={{ fontSize: 24 }}>{sec.emoji}</span>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0 }}>
                {sec.label}
              </h3>
              <span style={{ fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                {sec.section} · {sec.items.length} Items
              </span>
            </div>
          </div>

          {/* Coffee/Salty Notes */}
          {sec.note && (
            <div style={{ padding: '12px 16px', borderLeft: `3px solid ${Y}`, margin: '16px 16px 4px', background: 'rgba(232,240,0,0.06)', borderRadius: 6 }}>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{sec.note}</p>
            </div>
          )}

          {/* Menu Food Items list */}
          <div style={{ padding: '4px 0' }}>
            {sec.items.map((item: Item, j: number) => (
              <div
                key={item.name}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '16px 20px',
                  borderBottom: j < sec.items.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  animation: `itemSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both`,
                  animationDelay: `${Math.min(j * 25, 200)}ms`, // Caps dynamic stagger delays so long lists don't lag
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
                      {item.name}
                    </span>
                    {item.popular && (
                      <span style={{
                        fontSize: 8, fontWeight: 900, letterSpacing: 0.5,
                        textTransform: 'uppercase', color: '#0a0a0a',
                        background: Y, padding: '2px 6px', borderRadius: 4,
                      }}>
                        Popular
                      </span>
                    )}
                  </div>
                  {item.desc && (
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: '4px 0 0', lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  )}
                </div>
                <span style={{ fontSize: 14, fontWeight: 800, color: Y, whiteSpace: 'nowrap', flexShrink: 0, paddingTop: 1 }}>
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20 }}>
          {menuData.map((_, i) => (
            <button
              key={i}
              onClick={() => selectSection(i)}
              style={{
                width: i === activeIndex ? 18 : 6,
                height: 6,
                borderRadius: 3,
                border: 'none',
                background: i === activeIndex ? Y : 'rgba(255,255,255,0.25)',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.25s ease',
              }}
              aria-label={`Go to menu page ${i + 1}`}
            />
          ))}
        </div>

        {/* Wolt Floating Action Callout */}
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <a
            href="https://wolt.com/en/grc/heraklion/restaurant/the-batch"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: Y,
              color: '#0a0a0a',
              padding: '14px 36px',
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 0.3,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(232,240,0,0.15)',
              minHeight: 44, // Meets absolute touchscreen interactive target targets
            }}
          >
            Order on Wolt →
          </a>
        </div>
      </div>
    </section>
  );
}