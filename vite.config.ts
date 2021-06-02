import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import md from 'vite-plugin-md'
import pages from 'vite-plugin-pages'
import Prism from 'markdown-it-prism'
import { VitePluginMenus } from './vite/vite-plugin-menus'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    pages({
      extensions: ['vue', 'md'],
      pagesDir: ['docs', 'src/pages'],
    }),
    md({
      wrapperClasses: 'prose prose-sm m-auto text-left',
      headEnabled: true,
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Prism)
      },
    }),
    VitePluginMenus('docs'),
  ],
})
