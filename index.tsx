import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

/**
 * Note: We removed "import './index.css'" to prevent the build error 
 * "Could not resolve ./index.css" on Netlify. 
 * Styles are handled via Tailwind CDN in index.html.
 */

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Critical: Root element not found. Check index.html");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
