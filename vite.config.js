import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // ✅ import path for alias resolution

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ add alias for '@' to point to 'src'
    },
  },
  server: {
    proxy: {
      '/activity': 'http://localhost:3000',
    },
  },
});
