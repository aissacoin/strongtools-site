import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App'; 
import './index.css';

/**
 * STRONGTOOLS - SOVEREIGN REGISTRY MOUNTING PROTOCOL
 * This script initializes the React application and injects it into the DOM.
 */

const rootElement = document.getElementById('root');

if (!rootElement) {
  // Safety check to ensure the application doesn't crash silently
  throw new Error("CRITICAL ERROR: Target container 'root' not found in index.html.");
}

// Create the React root and render the application
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
