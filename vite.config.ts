import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  // Force Vite to look at the current directory as the project root
  root: process.cwd(),
  plugins: [
    react(),
    // This plugin generates a legacy bundle for older browsers
    legacy({
      targets: ['defaults', 'not IE 11', 'Android >= 4.4', 'iOS >= 9'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // Helps with older browser compatibility
    target: 'es5', 
    minify: 'terser', // Terser is better at minifying legacy code
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
});
