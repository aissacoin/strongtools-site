import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * STRONGTOOLS - CORE VITE CONFIGURATION
 * Optimized for Root Directory Deployment (No /src folder)
 */
export default defineConfig({
  plugins: [react()],
  
  // Set base to './' to ensure all assets are loaded using relative paths
  // This is the primary fix for the "White Screen" issue on Netlify
  base: './',

  resolve: {
    alias: {
      // Maps the '@' symbol to the current root directory
      '@': path.resolve(__dirname, './'),
    },
  },

  build: {
    // The directory where Netlify will look for the finished site
    outDir: 'dist',
    // Ensures assets are kept in the same flat structure
    assetsDir: 'assets',
    emptyOutDir: true,
    
    rollupOptions: {
      input: {
        // Explicitly defines index.html as the starting point
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
  
  // Prevents the build from failing due to minor TypeScript warnings
  logLevel: 'info',
});
