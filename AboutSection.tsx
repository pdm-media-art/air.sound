import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '4K/60fps', label: 'Videoqualit\u00e4t' },
  { value: '360\u00b0', label: 'Panorama-Aufnahmen' },
  { value: 'DaVinci', label: 'Professional Editing' },
  { value: 'Flexibel', label: 'Aufbauservice' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left column slides in from left
      gsap.from(leftRef.current, {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      });

      // Right column slides in from right
      gsap.from(rightRef.current, {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ueber-uns"
      ref={sectionRef}
      className="relative bg-[#1A535C] overflow-hidden"
    >
      {/* Gradient orb */}
      <div
        className="gradient-orb w-[400px] h-[400px] bg-[#FF6B35]/10 -bottom-40 -left-40"
      />

      <div className="section-padding content-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left column - Text */}
          <div ref={leftRef} className="lg:col-span-3">
            <h2
              className="font-display text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              \u00dcBER{' '}
              <span style={{ color: '#4ECDC4' }}>AIR.SOUND</span>
            </h2>
            <p className="text-[#F7FFF7]/90 text-lg leading-relaxed mb-6">
              Wir sind Ihr Partner f\u00fcr professionelle Drohnenaufnahmen, Eventtechnik und
              Musiktechnik in Mainz und Umgebung. Mit modernster Ausr\u00fcstung und kreativen
              Ideen heben wir Ihre Projekte auf das n\u00e4chste Level.
            </p>
            <p className="text-[#F7FFF7]/80 leading-relaxed">
              Egal ob Imagefilm, Hochzeitsvideo oder Geb\u00e4udeinspektion \u2014 wir liefern
              Ergebnisse, die begeistern. Von der ersten Idee bis zur finalen
              Nachbearbeitung begleiten wir Sie durch den gesamten Prozess.
            </p>

            {/* Equipment preview */}
            <div className="flex gap-4 mt-8 flex-wrap">
              <div className="w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 hover:bg-white/10 transition-colors">
                <img
                  src="/images/drone.png"
                  alt="DJI Drohne"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 hover:bg-white/10 transition-colors">
                <img
                  src="/images/camera.png"
                  alt="Kamera"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 hover:bg-white/10 transition-colors">
                <img
                  src="/images/mixer.png"
                  alt="Mischpult"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right column - Stats */}
          <div ref={rightRef} className="lg:col-span-2">
            <div className="space-y-6">
              {stats.map((stat) => (
                <div
                  key={stat.value}
                  className="glass-card p-6 flex items-center gap-5"
                >
                  <span
                    className="text-[#FFD166] font-mono"
                    style={{ fontSize: '2.5rem', fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[#F7FFF7] font-medium text-sm tracking-wider uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
