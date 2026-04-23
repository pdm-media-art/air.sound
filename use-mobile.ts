import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Film, Scan, Music } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Calendar,
    title: 'Veranstaltungen',
    description:
      'Hochzeiten, Geburtstage, Sportereignisse & Konzerte — mit spektakulären Luftaufnahmen in Szene gesetzt.',
  },
  {
    icon: Film,
    title: 'Imagefilme & Werbung',
    description:
      'Komplette Videoproduktion inkl. DaVinci Resolve Editing, 4K/60fps, Effekte & Musik.',
  },
  {
    icon: Scan,
    title: 'Inspektion & 3D-Modellierung',
    description:
      'Immobilienfotos, Gebäudeinspektion, Photogrammetrie & 360°-Dokumentation.',
  },
  {
    icon: Music,
    title: 'Musiktechnik',
    description:
      'Mikrofone, Mischpulte & Aufbauservice für Ihre Events — flexibel & professionell.',
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
      });

      // Cards stagger animation
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: 'top 80%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="leistungen"
      ref={sectionRef}
      className="relative bg-[#1A535C] overflow-hidden"
    >
      {/* Gradient orb */}
      <div
        className="gradient-orb w-[500px] h-[500px] bg-[#4ECDC4]/10 -top-40 -right-40"
      />

      <div className="section-padding content-max relative z-10">
        {/* Section header */}
        <div ref={titleRef} className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-10 bg-[#FF6B35] rounded-full" />
            <h2
              className="font-display text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              UNSERE LEISTUNGEN
            </h2>
          </div>
          <p className="text-[#F7FFF7]/80 text-lg max-w-xl ml-5">
            Alles aus einer Hand — von der Idee bis zur finalen Nachbearbeitung.
          </p>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                className="glass-card glass-card-hover p-8 group"
              >
                <div className="flex items-start gap-5">
                  {/* Icon circle */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #4ECDC4, #1A535C)',
                    }}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-xl mb-2">
                      {service.title}
                    </h3>
                    <p className="text-[#F7FFF7]/80 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
