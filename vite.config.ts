import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import md from 'vite-plugin-md'
import pages, { Route } from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import { VitePluginSite } from './vite/vite-plugin-site'
import Icons from 'unplugin-icons/vite'
import ViteIconsResolver from 'unplugin-icons/resolver'
import { highlight } from './vite/markdown/highlight'
import { setupMarkdownIt } from './vite/markdown'

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
      onRoutesGenerated(routes) {
        const visit = (routes: Route[]) => {
          for (const route of routes) {
            if (route.children) {
              visit(route.children)
            } else {
              if (/index\.md$/.test(route.component)) {
                route.path += '/index'
              }
            }
          }
        }

        visit(routes)
      },
    }),
    md({
      headEnabled: true,
      markdownItOptions: {
        highlight,
      },
      markdownItSetup: setupMarkdownIt,
    }),
    Components({
      dts: true,
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [ViteIconsResolver()],
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
