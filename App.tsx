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

export const App: React.FC = () => {
  // Use a fallback to ensure we never start with an empty or invalid state
  const [currentHash, setCurrentHash] = React.useState(window.location.hash || '#/');

  React.useEffect(() => {
    // 1. Force Home Redirect: Prevents the "Record Not Found" error on first load
    if (!window.location.hash || window.location.hash === '#' || window.location.hash === '') {
      window.location.replace('#/');
    }

    // 2. Disable Timezone/Location blocking: 
    // We handle the hash change without calling any external browser APIs that require permissions
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      // Scroll to top instantly without animation to keep it fast
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    // Clean the hash for comparison
    const path = currentHash.replace(/^#/, '') || '/';

    // Route Mapping Logic
    try {
      if (path === '/' || path === '' || path === '/home') return <Home />;
      if (path === '/about') return <About />;
      if (path === '/contact') return <Contact />;
      if (path === '/privacy') return <Privacy />;
      if (path === '/terms') return <Terms />;
      if (path === '/tools') return <Tools />;
      if (path === '/blog') return <Blog />;

      // Dynamic Route: Blog Details
      if (path.startsWith('/blog/')) {
        const id = path.split('/')[2];
        return <BlogDetail id={id || ''} />;
      }

      // Dynamic Route: Tool Details (Using static date if permission is blocked)
      if (path.startsWith('/tool/')) {
        const parts = path.split('/').filter(Boolean);
        const toolId = parts[1] || '';
        const dateParam = parts[2] || new Date().toISOString().split('T')[0];
        return <ToolDetail id={toolId} initialDate={dateParam} />;
      }

      // If no route matches, always return Home instead of an error page
      return <Home />;
    } catch (error) {
      console.error("Navigation error suppressed:", error);
      return <Home />;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};
