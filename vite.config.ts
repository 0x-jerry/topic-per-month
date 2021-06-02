import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import md from 'vite-plugin-md'
import voie from 'vite-plugin-voie'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    voie({
      extensions: ['vue', 'md'],
      pagesDir: 'docs',
    }),
    md(),
  ],
})
