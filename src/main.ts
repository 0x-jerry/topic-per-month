import App from './App.vue'
import { ViteSSG } from 'vite-ssg'
import routes from 'virtual:generated-pages'
// import 'normalize.css'
import 'virtual:windi.css'

if (import.meta.env.DEV) {
  console.log(routes)
}

export const createApp = ViteSSG(App, {
  base: import.meta.env.BASE_URL,
  routes,
})
