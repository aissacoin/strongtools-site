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
  // Use a safe initial state for the hash to prevent rendering issues on load
  const [currentHash, setCurrentHash] = React.useState(() => {
    try {
      return typeof window !== 'undefined' ? window.location.hash || '#/' : '#/';
    } catch (e) {
      return '#/';
    }
  });

  React.useEffect(() => {
    // 1. Force Home Redirect: Ensures the user lands on the dashboard immediately
    const initHash = window.location.hash;
    if (!initHash || initHash === '#' || initHash === '') {
      window.location.replace('#/');
    }

    // 2. Hash Change Listener: Handles navigation without page reloads
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      // Safe scroll to top for older browsers
      try {
        window.scrollTo(0, 0);
      } catch (e) {
        document.documentElement.scrollTop = 0;
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Clean up listener on unmount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    // Clean hash and normalize path for stable routing
    const path = currentHash.replace(/^#/, '') || '/';

    try {
      // Standard Static Routes
      if (path === '/' || path === '' || path === '/home') return <Home />;
      if (path === '/about') return <About />;
      if (path === '/contact') return <Contact />;
      if (path === '/privacy') return <Privacy />;
      if (path === '/terms') return <Terms />;
      if (path === '/tools') return <Tools />;
      if (path === '/blog') return <Blog />;

      // Dynamic Route: Blog Article Details
      if (path.indexOf('/blog/') === 0) {
        const parts = path.split('/').filter(Boolean);
        const blogId = parts[1] || '';
        return <BlogDetail id={blogId} />;
      }

      // Dynamic Route: Tool Archive Details
      if (path.indexOf('/tool/') === 0) {
        const parts = path.split('/').filter(Boolean);
        const toolId = parts[1] || '';
        // Safe date generation that doesn't trigger permission prompts
        const fallbackDate = new Date().toISOString().slice(0, 10);
        const dateParam = parts[2] || fallbackDate;
        return <ToolDetail id={toolId} initialDate={dateParam} />;
      }

      // Fallback: Always return Home to prevent blank screens
      return <Home />;
    } catch (error) {
      // Fail-safe: Render Home if any routing logic fails
      console.error("Navigation error, falling back to Home:", error);
      return <Home />;
    }
  };

  return (
    <Layout>
      {/* Error Boundary logic: if Layout crashes due to missing icons, 
          the whole app might go black. Ensure Layout is also protected.
      */}
      {renderContent()}
    </Layout>
  );
};
