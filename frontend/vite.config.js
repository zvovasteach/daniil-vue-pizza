import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';
import eslint from 'vite-plugin-eslint2';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    eslint({
      cache: true,
      lintInWorker: true,
      exclude: ['**/node_modules/**', 'dist/**'],
    }),
    checker({
      enableBuild: false,
      overlay: {
        initialIsOpen: false,
      },
      terminal: false,
      eslint: {
        lintCommand: 'eslint "src/**/*.{js,vue}"',
      },
    }),
  ],
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://backend:3000/',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    hmr: {
      overlay: false,
    },
  },
});
