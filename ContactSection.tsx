import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactCards = [
  {
    icon: Mail,
    label: 'E-Mail',
    value: 'air.sound.information@gmail.com',
    href: 'mailto:air.sound.information@gmail.com',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '0178 3549419',
    href: 'tel:+491783549419',
  },
  {
    icon: MapPin,
    label: 'Adresse',
    value: 'W\u00f6hlerstra\u00dfe 2, 55120 Mainz',
    href: 'https://maps.google.com/?q=W\u00f6hlerstra\u00dfe+2+55120+Mainz',
  },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Main content fade in
      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      });

      // Cards stagger
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: 'top 85%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="kontakt"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1A535C 0%, #4ECDC4 100%)',
      }}
    >
      <div className="section-padding content-max relative z-10">
        <div ref={contentRef} className="text-center mb-12">
          <h2
            className="font-display text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            KONTAKTIEREN SIE UNS
          </h2>
          <p className="text-[#F7FFF7]/90 text-lg max-w-md mx-auto">
            Vereinbaren Sie ein unverbindliches Beratungsgespr\u00e4ch.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-6">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <a
                key={card.label}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                className="glass-card glass-card-hover p-6 text-center group block"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #FFD166, #FF6B35)',
                  }}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <p className="text-[#F7FFF7]/60 text-xs uppercase tracking-wider mb-1">
                  {card.label}
                </p>
                <p className="text-white font-medium text-sm group-hover:text-[#FFD166] transition-colors">
                  {card.value}
                </p>
              </a>
            );
          })}
        </div>

        {/* Instagram card */}
        <div className="max-w-md mx-auto mb-10">
          <a
            href="https://www.instagram.com/air.sound.de/"
            target="_blank"
            rel="noopener noreferrer"
            ref={(el) => {
              if (el) cardsRef.current[3] = el;
            }}
            className="glass-card glass-card-hover p-5 flex items-center justify-center gap-4 group"
          >
            <Instagram size={24} className="text-[#FF6B35]" />
            <span className="text-[#F7FFF7]/60 text-sm">Folgen Sie uns</span>
            <span className="text-white font-semibold group-hover:text-[#FFD166] transition-colors">
              @air.sound.de
            </span>
          </a>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="mailto:air.sound.information@gmail.com?subject=Anfrage%20-%20Air.Sound"
            className="inline-block bg-[#FFD166] text-[#0A0F0D] px-12 py-5 rounded-full font-bold text-lg hover:scale-[1.03] hover:bg-[#FFE08A] transition-all duration-200 shadow-lg shadow-black/20"
          >
            JETZT ANFRAGEN
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
