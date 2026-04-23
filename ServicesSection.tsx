import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    src: '/images/event-stage.jpg',
    alt: 'Event & Konzert',
    category: 'Veranstaltungen',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/wedding.jpg',
    alt: 'Hochzeit',
    category: 'Hochzeiten',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/images/real-estate.jpg',
    alt: 'Immobilie',
    category: 'Immobilien',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/inspection.jpg',
    alt: 'Gebäudeinspektion',
    category: 'Inspektion',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/drone.png',
    alt: 'Drohne',
    category: 'Equipment',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/camera.png',
    alt: 'Kamera',
    category: 'Equipment',
    span: 'col-span-1 row-span-1',
  },
];

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

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

      // Gallery items stagger
      gsap.from(itemsRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: itemsRef.current[0],
          start: 'top 80%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="galerie"
      ref={sectionRef}
      className="relative bg-[#F7FFF7] overflow-hidden"
    >
      <div className="section-padding content-max relative z-10">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2
            className="font-display text-[#0A0F0D] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            UNSERE ARBEIT
          </h2>
          <div className="w-16 h-1 bg-[#FF6B35] mx-auto mb-4 rounded-full" />
          <p className="text-[#0A0F0D]/70 text-lg max-w-xl mx-auto">
            Ein Auszug aus unseren Projekten — von Events bis hin zu kommerziellen Filmproduktionen.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryImages.map((image, i) => (
            <div
              key={image.src}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${image.span}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#0A0F0D]/0 group-hover:bg-[#0A0F0D]/50 transition-all duration-400 flex items-end p-4">
                <span className="text-white text-sm font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
