import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        /**
         * Split the libraries out of the app entry.
         *
         * These three change on a dependency upgrade, not on a content edit,
         * so giving them their own hashed files means a copy tweak ships a
         * few kB instead of re-downloading React and Motion. They are listed
         * separately rather than as one "vendor" blob because Motion is the
         * heaviest and the most likely to be dropped or lazy-loaded later.
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react';
          if (/[\\/]node_modules[\\/]react-router/.test(id)) return 'router';
          if (/[\\/]node_modules[\\/](motion|framer-motion)/.test(id)) return 'motion';
        },
      },
    },
  },
});
