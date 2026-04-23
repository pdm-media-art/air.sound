const Footer = () => {
  const navLinks = [
    { label: 'Leistungen', href: '#leistungen' },
    { label: 'Galerie', href: '#galerie' },
    { label: '\u00dcber uns', href: '#ueber-uns' },
    { label: 'Kontakt', href: '#kontakt' },
    { label: 'Impressum', href: '#' },
    { label: 'Datenschutz', href: '#' },
  ];

  const scrollTo = (href: string) => {
    if (href === '#') return;
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0A0F0D] border-t border-white/5">
      <div className="content-max py-16 px-[clamp(1.5rem,5vw,3rem)]">
        {/* Logo */}
        <div className="text-center mb-8">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[#F7FFF7] font-extrabold text-2xl tracking-[0.1em] hover:text-[#4ECDC4] transition-colors inline-block"
          >
            AIR.SOUND
          </a>
          <p className="text-[#4ECDC4] text-sm mt-2">
            Drohnen &amp; Eventtechnik
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-[#F7FFF7]/70 text-xs font-medium uppercase tracking-[0.05em] hover:text-[#4ECDC4] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#F7FFF7]/50">
          <span>&copy; 2025 Air.Sound</span>
          <span>Marek Blaschke</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
