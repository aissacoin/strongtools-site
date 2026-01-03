import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

/**
 * STRONGTOOLS SOVEREIGN REGISTRY - MOUNTING PROTOCOL
 * This file acts as the bridge between your React logic and the HTML structure.
 */

const rootElement = document.getElementById('root');

if (!rootElement) {
  // Critical safety check: ensures the HTML has the necessary 'root' div
  throw new Error("Target container 'root' is missing. Check your index.html file.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
