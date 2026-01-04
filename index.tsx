import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

/**
 * PRODUCTION SAFETY FIX:
 * Ensures global variables exist before React attempts to use them.
 */
if (typeof window !== 'undefined') {
  // Fallback for Lucide
  if (!(window as any).LucideIcons) (window as any).LucideIcons = {};
  
  // Fallback for Category Colors if index.html failed to load them
  if (!(window as any).CATEGORY_COLORS) {
    (window as any).CATEGORY_COLORS = { security: '#3b', utility: '#10', coding: '#8b' };
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Error: #root element is missing from index.html");
} else {
  const root = ReactDOM.createRoot(rootElement);
  
  // Checking if App is defined before rendering to avoid Error #130
  if (typeof App !== 'undefined') {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    rootElement.innerHTML = `<div style="color:white;text-align:center;padding:50px;">
        <h2>Initialization Error</h2>
        <p>The App component is undefined. Check your exports.</p>
    </div>`;
  }
}
