import App from './App.vue'
import { ViteSSG } from 'vite-ssg'
import routes from 'virtual:generated-pages'

export const createApp = ViteSSG(App, {
  base: import.meta.env.BASE_URL,
  routes,
})
