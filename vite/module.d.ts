declare module 'virtual:site' {
  export interface ArticleInfo {
    /**
     * @default true
     */
    publish: boolean
    /**
     * @default true
     */
    visible: boolean
    /**
     * @default filename
     */
    title: string
    /**
     * filename
     */
    routePath: string
    /**
     * created date of the file, unit is ms
     */
    date: number
    /**
     * last modified of the file, unit is ms
     */
    lastUpdateDate: number
    /**
     * @default []
     */
    tags: string[]
  }

  export interface SiteConfig {
    articles: ArticleInfo[]
  }

  const v: SiteConfig

  export default v
}
