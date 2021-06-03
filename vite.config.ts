import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import md from 'vite-plugin-md'
import pages from 'vite-plugin-pages'
import components from 'vite-plugin-components'
import { VitePluginSite } from './vite/vite-plugin-site'
import { setupMarkdownIt } from './vite/markdown-it'

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
      headEnabled: true,
      markdownItOptions: {
        linkify: true,
        typographer: true,
      },
      markdownItSetup: setupMarkdownIt,
    }),
    components({
      globalComponentsDeclaration: true,
      extensions: ['vue', 'md'],
      customLoaderMatcher: (path) => path.endsWith('.md'),
    }),
    VitePluginSite('docs'),
  ],
})
