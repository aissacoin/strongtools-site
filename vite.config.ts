import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  root: process.cwd(),
  
  // FIXED: Adjusted base for the repository "strongtools-site"
  base: '/strongtools-site/', 

  plugins: [
    react(),
    legacy({
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
    target: 'es5', 
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true
      }
    },
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    },
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
});
