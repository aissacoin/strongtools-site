import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  // Root and Base configuration for reliable path resolving
  root: process.cwd(),
  base: './', 
  
  plugins: [
    react(),
    legacy({
      // Aggressive legacy support for maximum device reach
      targets: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'not dead', 'IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // Target es5 combined with the legacy plugin ensures it runs on old JS engines
    target: 'es5', 
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: false, // Keep logs for debugging if it fails again
        drop_debugger: true
      }
    },
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        // Ensures consistent naming which helps some proxy/legacy servers
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    },
  },
  // Ensure the dev server and build process handles the root correctly
  server: {
    fs: {
      allow: ['..']
    }
  }
});
