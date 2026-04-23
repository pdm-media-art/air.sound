import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const JourneySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cloudsVideoRef = useRef<HTMLVideoElement>(null);
  const cityVideoRef = useRef<HTMLVideoElement>(null);
  const monitorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const finalTextRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const scene = sceneRef.current;
    const cloudsVideo = cloudsVideoRef.current;
    const cityVideo = cityVideoRef.current;
    const monitor = monitorRef.current;
    const text = textRef.current;
    const finalText = finalTextRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!container || !scene || !cloudsVideo || !cityVideo || !monitor || !text || !finalText || !scrollIndicator) return;

    // Wait for videos to load
    let loadedCount = 0;
    const onVideoLoad = () => {
      loadedCount++;
      if (loadedCount >= 2) {
        setVideoLoaded(true);
      }
    };

    cloudsVideo.addEventListener('loadeddata', onVideoLoad);
    cityVideo.addEventListener('loadeddata', onVideoLoad);

    // Start playing videos
    cloudsVideo.play().catch(() => {});
    cityVideo.play().catch(() => {});

    const ctx = gsap.context(() => {
      // Main timeline - pinned for 400vh of scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=400vh',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Stage 1: Hero text visible (0% - 15%)
      // Text starts visible, fades out as we dive
      tl.fromTo(
        text,
        { opacity: 1, y: 0, scale: 1 },
        { opacity: 0, y: -60, scale: 0.9, ease: 'none' },
        0
      );

      // Scroll indicator fades early
      tl.to(scrollIndicator, { opacity: 0, ease: 'none' }, 0);
      tl.to(scrollIndicator, { visibility: 'hidden' }, 0.05);

      // Stage 2: Clouds video zoom and dive (0% - 40%)
      // Clouds start normal, zoom in, get brighter
      tl.fromTo(
        cloudsVideo,
        { scale: 1, filter: 'brightness(1) blur(0px)' },
        { scale: 2.5, filter: 'brightness(1.3) blur(2px)', ease: 'none' },
        0
      );

      // Stage 3: City video fades in while clouds fade (30% - 60%)
      // City starts invisible, fades in, clouds fade out
      tl.fromTo(
        cityVideo,
        { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1, ease: 'none' },
        0.3
      );

      tl.to(
        cloudsVideo,
        { opacity: 0, ease: 'none' },
        0.35
      );

      // City video zooms toward building (45% - 75%)
      tl.fromTo(
        cityVideo,
        { scale: 1 },
        { scale: 3, ease: 'none' },
        0.45
      );

      // Motion blur effect on city as we speed up
      tl.fromTo(
        cityVideo,
        { filter: 'brightness(1) blur(0px)' },
        { filter: 'brightness(0.7) blur(4px)', ease: 'none' },
        0.5
      );

      // Stage 4: Monitor appears and zooms (65% - 90%)
      tl.fromTo(
        monitor,
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1, ease: 'power2.out' },
        0.65
      );

      // City fades out as monitor takes over
      tl.to(
        cityVideo,
        { opacity: 0, ease: 'none' },
        0.7
      );

      // Stage 5: Final text appears (85% - 100%)
      tl.fromTo(
        finalText,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0.85
      );

      // Scene gets a warm glow at the end
      tl.fromTo(
        scene,
        { filter: 'brightness(1)' },
        { filter: 'brightness(1.1)', ease: 'none' },
        0.85
      );
    }, container);

    return () => {
      ctx.revert();
      cloudsVideo.removeEventListener('loadeddata', onVideoLoad);
      cityVideo.removeEventListener('loadeddata', onVideoLoad);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full">
      {/* Fixed scene container */}
      <div
        ref={sceneRef}
        className="fixed inset-0 w-full h-screen overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #87CEEB 0%, #4ECDC4 30%, #1A535C 70%, #0A0F0D 100%)',
          }}
        />

        {/* Clouds video layer */}
        <video
          ref={cloudsVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/clouds.mp4"
          muted
          loop
          playsInline
          style={{ opacity: 1 }}
        />

        {/* Speed lines overlay for diving effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(78,205,196,0.15) 70%, rgba(26,83,92,0.3) 100%)',
          }}
        />

        {/* City video layer */}
        <video
          ref={cityVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/city.mp4"
          muted
          loop
          playsInline
          style={{ opacity: 0 }}
        />

        {/* Monitor reveal layer */}
        <div
          ref={monitorRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0 }}
        >
          <div className="relative w-[90vw] max-w-[1200px] aspect-video">
            {/* Monitor glow */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                boxShadow: '0 0 100px 30px rgba(78,205,196,0.3), 0 0 200px 60px rgba(255,209,102,0.15)',
              }}
            />
            {/* Monitor image */}
            <img
              src="/images/monitor.jpg"
              alt="Video editing workspace"
              className="w-full h-full object-cover rounded-2xl"
              style={{
                border: '2px solid rgba(78,205,196,0.3)',
              }}
            />
            {/* Screen reflection overlay */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
              }}
            />
          </div>
        </div>

        {/* Hero text overlay - Stage 1 */}
        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <h1
            className="font-display text-white"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              textShadow: '0 4px 30px rgba(0,0,0,0.3), 0 0 60px rgba(78,205,196,0.2)',
            }}
          >
            HEBEN SIE AB.
          </h1>
          <p
            className="mt-4 text-[#F7FFF7] max-w-xl"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              textShadow: '0 2px 15px rgba(0,0,0,0.4)',
              lineHeight: 1.6,
            }}
          >
            Drohnenaufnahmen. Video &amp; Fotografie. Eventtechnik.
          </p>
        </div>

        {/* Final text - Stage 5 */}
        <div
          ref={finalTextRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ opacity: 0 }}
        >
          <h2
            className="font-display text-white mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 0 80px rgba(78,205,196,0.3)',
            }}
          >
            Willkommen bei{' '}
            <span className="text-gradient-sky" style={{ WebkitTextFillColor: '#4ECDC4' }}>
              Air.Sound
            </span>
          </h2>
          <p
            className="text-[#F7FFF7] max-w-lg"
            style={{
              fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              lineHeight: 1.6,
            }}
          >
            Professionelle Drohnenaufnahmen &amp; Eventtechnik aus Mainz.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono-label text-white/70">Scrollen</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="scroll-dot w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      {!videoLoaded && (
        <div className="fixed inset-0 bg-[#0A0F0D] flex items-center justify-center" style={{ zIndex: 100 }}>
          <div className="text-center">
            <div className="w-12 h-12 border-3 border-[#4ECDC4] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-mono-label text-[#4ECDC4]">Laden...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JourneySection;
