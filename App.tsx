import React from 'react';
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

// FIX: Define CATEGORY_COLORS globally to prevent the ReferenceError
(window as any).CATEGORY_COLORS = {
  security: 'blue',
  utility: 'green',
  coding: 'purple',
  web: 'orange',
  design: 'pink'
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
        window.scrollTo(0, 0);
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

      if (path.indexOf('/blog/') === 0) {
        const parts = path.split('/').filter(Boolean);
        const blogId = parts[1] || '';
        return <BlogDetail id={blogId} />;
      }

      if (path.indexOf('/tool/') === 0) {
        const parts = path.split('/').filter(Boolean);
        const toolId = parts[1] || '';
        const fallbackDate = new Date().toISOString().slice(0, 10);
        const dateParam = parts[2] || fallbackDate;
        return <ToolDetail id={toolId} initialDate={dateParam} />;
      }

      return <Home />;
    } catch (error) {
      console.error("Navigation error, falling back to Home:", error);
      return <Home />;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};
