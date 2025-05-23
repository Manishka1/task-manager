import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Optional: if you want @ alias
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});