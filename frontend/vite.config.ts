import react from '@vitejs/plugin-react';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

// SEE: https://antfu.me/posts/isomorphic-dirname
const _dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/': `${_dirname}/src/`,
    },
  },
});
