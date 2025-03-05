// https://vitejs.dev/config/

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_BASE_URL,
    plugins: [
      react(),
      tsconfigPaths(),
      tailwindcss(),
      //mkcert(),
      checker({ typescript: true }),
    ],
    server: {
      open: true,
      //https: true,
    },
    css: {
      postcss: {
        plugins: [autoprefixer],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});
