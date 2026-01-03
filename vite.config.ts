import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');

    return {
      // Critical fix for White Screen: Use relative paths
      base: './',
      
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || ""),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || ""),
        'process.env.OPENROUTER_KEY': JSON.stringify(env.VITE_OPENROUTER_KEY || "")
      },
      resolve: {
        alias: {
          // Points '@' to root directory instead of /src
          '@': path.resolve(__dirname, './'),
        }
      },
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        emptyOutDir: true
      }
    };
});
