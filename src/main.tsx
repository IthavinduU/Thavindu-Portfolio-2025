import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { HelmetProvider } from 'react-helmet-async'; // 👈 Import HelmetProvider

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider> {/* ✅ Wrap App with HelmetProvider */}
      <App />
    </HelmetProvider>
  </StrictMode>
);
