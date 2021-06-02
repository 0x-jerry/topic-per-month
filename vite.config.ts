import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import md from 'vite-plugin-md'
import pages from 'vite-plugin-pages'
import Prism from 'markdown-it-prism'
import { VitePluginMenus } from './vite/vite-plugin-menus'
import components from 'vite-plugin-components'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/topic-per-month/',
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    pages({
      extensions: ['vue', 'md'],
      pagesDir: ['src/pages'],
    }),
    md({
      wrapperClasses: 'prose prose-sm m-auto text-left',
      headEnabled: true,
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Prism)
      },
    }),
    components({
      globalComponentsDeclaration: true,
      extensions: ['vue', 'md'],
      customLoaderMatcher: (path) => path.endsWith('.md'),
    }),
    VitePluginMenus('docs'),
  ],
})
