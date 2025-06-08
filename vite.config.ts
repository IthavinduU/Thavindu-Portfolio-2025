import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import sitemap from 'vite-plugin-sitemap';  // <-- default import

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://thavindu.me',
      routes: ['/', '/about', '/projects', '/services', '/roadmap', '/articles', '/contact'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
