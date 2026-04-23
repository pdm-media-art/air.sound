import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Leistungen', href: '#leistungen' },
    { label: 'Galerie', href: '#galerie' },
    { label: '\u00dcber uns', href: '#ueber-uns' },
    { label: 'Kontakt', href: '#kontakt' },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,15,13,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="content-max flex items-center justify-between py-4 px-[clamp(1.5rem,5vw,3rem)]">
          {/* Logo */}
          <a
            href="#"
            className="text-[#F7FFF7] font-extrabold text-xl tracking-[0.1em] hover:text-[#4ECDC4] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            AIR.SOUND
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-[#F7FFF7] text-sm font-medium uppercase tracking-[0.05em] hover:text-[#4ECDC4] transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4ECDC4] transition-all duration-250 group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => scrollTo('#kontakt')}
              className="bg-[#FF6B35] text-white px-7 py-3 rounded-full font-semibold text-sm hover:scale-[1.03] hover:bg-[#FF8555] transition-all duration-200"
            >
              Anfragen
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#F7FFF7] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 bg-[#0A0F0D]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transform: mobileOpen ? 'translateY(0)' : 'translateY(-20px)',
        }}
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="text-[#F7FFF7] text-2xl font-semibold hover:text-[#4ECDC4] transition-colors"
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => scrollTo('#kontakt')}
          className="bg-[#FF6B35] text-white px-10 py-4 rounded-full font-semibold text-lg hover:scale-[1.03] transition-transform mt-4"
        >
          Anfragen
        </button>
      </div>
    </>
  );
};

export default Header;
