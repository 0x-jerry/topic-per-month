import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import md from 'vite-plugin-md'
import pages from 'vite-plugin-pages'
import components from 'vite-plugin-components'
import WindiCSS from 'vite-plugin-windicss'
import { VitePluginSite } from './vite/vite-plugin-site'
import { setupMarkdownIt } from './vite/markdown-it'
import Icons, { ViteIconsResolver } from 'vite-plugin-icons'

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
      customComponentResolvers: [ViteIconsResolver()],
    }),
    VitePluginSite('docs'),
    WindiCSS({
      config: {
        shortcuts: {
          card: 'shadow shadow-gray-500',
          'card-lg': 'shadow shadow-gray-500 shadow-lg',
          'fixed-top': 'fixed top-0 left-0 w-full z-50',
          link: 'text-gray-400 hover:text-gray-600 cursor-pointer',
        },
      },
    }),
    Icons(),
  ],
})
