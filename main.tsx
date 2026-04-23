import { useEffect } from 'react';
import Header from './Header';
import JourneySection from './JourneySection';
import ServicesSection from './ServicesSection';
import GallerySection from './GallerySection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';

function App() {
  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      '/images/monitor.jpg',
      '/images/drone.png',
    ];
    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="relative">
      {/* Header */}
      <Header />

      {/* Journey experience - fixed canvas */}
      <JourneySection />

      {/* Content sections - scrollable */}
      <main className="relative" style={{ zIndex: 10 }}>
        <ServicesSection />
        <GallerySection />
        <AboutSection />
        <ContactSection />
      </main>

    </div>
  );
}

export default App;
