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
import { AlertTriangle } from 'lucide-react';

export const App: React.FC = () => {
  const [currentHash, setCurrentHash] = React.useState(window.location.hash || '#/');

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    const hash = currentHash.replace(/^#/, '') || '/';

    if (hash === '/' || hash === '') return <Home />;
    if (hash === '/about') return <About />;
    if (hash === '/contact') return <Contact />;
    if (hash === '/privacy') return <Privacy />;
    if (hash === '/terms') return <Terms />;
    if (hash === '/tools') return <Tools />;
    if (hash === '/blog') return <Blog />;

    if (hash.startsWith('/blog/')) {
      const parts = hash.split('/');
      const id = parts[2];
      return <BlogDetail id={id} />;
    }

    if (hash.startsWith('/tool/')) {
      const parts = hash.split('/').filter(Boolean);
      const id = parts[1];
      const date = parts[2];
      return <ToolDetail id={id} initialDate={date} />;
    }

    return <div className="text-white text-center mt-20">Page Not Found</div>;
  };

  return <Layout>{renderContent()}</Layout>;
};
