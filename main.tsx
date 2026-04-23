import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  return (
    <div style={{ backgroundColor: '#0a0f0d', color: '#f7fff7', minHeight: '100vh', padding: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>AIR.SOUND</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Veranstaltungstechnik & Event Management
      </p>
      <p>Website wird geladen...</p>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
