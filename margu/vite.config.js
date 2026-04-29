import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [preact()],
  server: {
    proxy: {
      '/marsu-api': {
        target: 'https://promo-prk.marsu.ru',
        changeOrigin: true,
        secure: true,
        rewrite: path => path.replace(/^\/marsu-api/, '/promo-prk/web/api'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
