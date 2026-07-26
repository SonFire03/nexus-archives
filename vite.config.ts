import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/nexus-archives/',
  plugins: [react()],
  build: { sourcemap: true },
});
