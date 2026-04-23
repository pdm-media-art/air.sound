import { useEffect } from 'react';
import Header from './sections/Header';
import JourneySection from './sections/JourneySection';
import ServicesSection from './sections/ServicesSection';
import GallerySection from './sections/GallerySection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

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

      {/* Footer */}
      <div className="relative" style={{ zIndex: 10 }}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
