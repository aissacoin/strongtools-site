import React from 'react';
// Imports pointing to the current directory (assuming App.tsx is inside /src)
import { Layout } from './Layout';
import { Home } from './Home';
import { Tools } from './Tools';
import { Blog } from './Blog';
import { BlogDetail } from './BlogDetail';
import { ToolDetail } from './ToolDetail';
import { Contact } from './Contact';
import { About } from './About';
import { Privacy } from './Privacy';
import { Terms } from './Terms';

/** * GLOBAL SYSTEM CONFIGURATION
 * Defining the visual identity for the English version
 */
(window as any).CATEGORY_COLORS = {
  security: '#D4AF37', // Elite Gold
  utility: '#ffffff',  // Pure White
  coding: '#71717a',   // Zinc Gray
  web: '#a1a1aa',      // Silver
  design: '#D4AF37'    // Golden Accent
};

export const App: React.FC = () => {
  // State to track the current URL hash (Routing)
  const [currentHash, setCurrentHash] = React.useState(() => {
    try {
      return typeof window !== 'undefined' ? window.location.hash || '#/' : '#/';
    } catch (e) {
      return '#/';
    }
  });

  // Effect to handle navigation changes and scrolling
  React.useEffect(() => {
    const initHash = window.location.hash;
    if (!initHash || initHash === '#' || initHash === '') {
      window.location.replace('#/');
    }

    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {
        document.documentElement.scrollTop = 0;
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  /**
   * ROUTER LOGIC
   * This function decides which component to show based on the URL
   */
  const renderContent = () => {
    const path = currentHash.replace(/^#/, '') || '/';

    try {
      // Main Pages
      if (path === '/' || path === '' || path === '/home') return <Home />;
      if (path === '/about') return <About />;
      if (path === '/contact') return <Contact />;
      if (path === '/privacy') return <Privacy />;
      if (path === '/terms') return <Terms />;
      if (path === '/tools') return <Tools />;
      if (path === '/blog') return <Blog />;

      // Dynamic Blog Routes
      if (path.startsWith('/blog/')) {
        const parts = path.split('/').filter(Boolean);
        return <BlogDetail id={parts[1] || ''} />;
      }

      // Dynamic Tool Routes
      if (path.startsWith('/tool/')) {
        const parts = path.split('/').filter(Boolean);
        const toolId = parts[1] || '';
        const fallbackDate = new Date().toISOString().slice(0, 10);
        return <ToolDetail id={toolId} initialDate={parts[2] || fallbackDate} />;
      }

      // Default Fallback
      return <Home />;
    } catch (error) {
      console.error("Critical Navigation Error:", error);
      return <Home />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#050505] selection:bg-[#D4AF37] selection:text-black font-sans">
        {renderContent()}
      </div>
    </Layout>
  );
};
