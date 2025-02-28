import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "src/assets/variables.less";',
        javascriptEnabled: true
      }
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: 'index.html'
      }
    },
    sourcemap: false,
    assetsDir: ''
  }
});
