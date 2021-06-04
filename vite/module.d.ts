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
     * @default created date of the file
     */
    date: Date
    /**
     * @default last modified of the file
     */
    lastUpdateDate: Date
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
