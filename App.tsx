import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { TemplateEditor } from './pages/TemplateEditor';
import { Generator } from './pages/Generator';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  // Safely access BASE_URL with fallback. 
  // import.meta.env might be undefined in some environments, causing a crash if accessed directly.
  // Casting import.meta to any to avoid TypeScript errors regarding 'env' property when types are missing.
  const basename = (import.meta as any).env?.BASE_URL || '/airi-power-builder/';

  return (
    <LanguageProvider>
      <BrowserRouter basename={basename}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/template" element={<TemplateEditor />} />
            <Route path="/generate" element={<Generator />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;