declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.md' {
  import { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}

declare module 'virtual:generated-pages' {
  import { RouteRecordRaw } from 'vue-router'
  const v: RouteRecordRaw[]
  export default v
}
