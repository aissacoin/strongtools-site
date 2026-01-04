import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  // Setting the root to current working directory
  root: process.cwd(),
  
  // FIXED: Ensure this matches your GitHub Repository name exactly
  base: '/strongtools-site/', 

  plugins: [
    react(),
    legacy({
      targets: ['> 0.2%', 'last 2 versions', 'not dead'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],

  resolve: {
    alias: {
      // Maps '@' to the 'src' directory for cleaner imports
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // Updated to esnext for better performance, legacy plugin handles the rest
    target: 'esnext', 
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: false, // Keep consoles for now to debug any live errors
        drop_debugger: true
      }
    },
    rollupOptions: {
      // Ensure Vite looks for index.html in the root directory
      input: path.resolve(__dirname, 'index.html'),
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`
      }
    },
  },

  server: {
    port: 3000,
    open: true,
    fs: {
      // Security: Allow serving files from the root and src
      allow: ['.']
    }
  }
});
