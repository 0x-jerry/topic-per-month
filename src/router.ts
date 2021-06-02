import { createRouter, createWebHashHistory } from 'vue-router'
import routes from 'voie-pages'

console.log(routes)

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
