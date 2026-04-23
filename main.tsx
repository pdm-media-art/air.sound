import React from 'react';
import ReactDOM from 'react-dom/client';
import { useEffect } from 'react';
import Header from './Header';
import GallerySection from './GallerySection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import './index.css';

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

      {/* Content sections - scrollable */}
      <main className="relative" style={{ zIndex: 10 }}>
        <GallerySection />
        <AboutSection />
        <ContactSection />
      </main>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
