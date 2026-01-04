import React from 'react';
import { Layout } from './src/Layout';
import { Home } from './src/Home';
import { Tools } from './src/Tools';
import { Blog } from './src/Blog';
import { BlogDetail } from './src/BlogDetail';
import { ToolDetail } from './src/ToolDetail';
import { Contact } from './src/Contact';
import { About } from './src/About';
import { Privacy } from './src/Privacy';
import { Terms } from './src/Terms';

/** * SYSTEM CONFIGURATION
 * Enforcing English Global Constants
 */
(window as any).CATEGORY_COLORS = {
  security: '#D4AF37', 
  utility: '#ffffff',  
  coding: '#71717a',   
  web: '#a1a1aa',      
  design: '#D4AF37'    
};

export const App: React.FC = () => {
  const [currentHash, setCurrentHash] = React.useState(() => {
    try {
      return typeof window !== 'undefined' ? window.location.hash || '#/' : '#/';
    } catch (e) {
      return '#/';
    }
  });

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

  const renderContent = () => {
    const path = currentHash.replace(/^#/, '') || '/';

    try {
      if (path === '/' || path === '' || path === '/home') return <Home />;
      if (path === '/about') return <About />;
      if (path === '/contact') return <Contact />;
      if (path === '/privacy') return <Privacy />;
      if (path === '/terms') return <Terms />;
      if (path === '/tools') return <Tools />;
      if (path === '/blog') return <Blog />;

      if (path.startsWith('/blog/')) {
        const parts = path.split('/').filter(Boolean);
        const blogId = parts[1] || '';
        return <BlogDetail id={blogId} />;
      }

      if (path.startsWith('/tool/')) {
        const parts = path.split('/').filter(Boolean);
        const toolId = parts[1] || '';
        const fallbackDate = new Date().toISOString().slice(0, 10);
        const dateParam = parts[2] || fallbackDate;
        return <ToolDetail id={toolId} initialDate={dateParam} />;
      }

      return <Home />;
    } catch (error) {
      console.error("Critical Navigation Error:", error);
      return <Home />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#050505] selection:bg-[#D4AF37] selection:text-black">
        {renderContent()}
      </div>
    </Layout>
  );
};
