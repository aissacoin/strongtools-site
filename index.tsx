import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

/**
 * PRODUCTION SAFETY FIX:
 * We ensure that even if some libraries (like Lucide) fail to load globally,
 * the React application doesn't crash immediately.
 */

// Define a fallback for Lucide to prevent "ReferenceError" in older browsers
if (typeof window !== 'undefined' && !(window as any).LucideIcons) {
  (window as any).LucideIcons = {};
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Error: #root element is missing from index.html");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
