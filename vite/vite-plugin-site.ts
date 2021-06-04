import path from 'path'
import { promises as fs } from 'fs'
import { Plugin, ResolvedConfig } from 'vite'

const virtualModuleId = 'virtual:site'

let viteConf: null | ResolvedConfig = null
export function VitePluginSite(docsDir: string): Plugin {
  docsDir = path.resolve(docsDir)

  return {
    name: 'vite-i18n-plugin',
    configResolved(config) {
      viteConf = config
    },
    resolveId(source) {
      if (source === virtualModuleId) {
        return source
      }
    },
    async load(id) {
      if (id !== virtualModuleId) {
        return null
      }

      const code = await generateCode(docsDir, viteConf?.env.DEV)

      return {
        code,
      }
    },
  }
}

import matter from 'gray-matter'
import { ArticleInfo, SiteConfig } from 'virtual:site'

async function generateCode(dir: string, isDev: boolean) {
  const articles: ArticleInfo[] = []

  const files = await fs.readdir(path.resolve(dir))

  const allPromise = files.map(async (file) => {
    let filePath = path.join(dir, file)
    let parsedPath = path.parse(filePath)
    let stat = await fs.stat(filePath)

    const routePath = parsedPath.name

    if (stat.isDirectory()) {
      filePath = path.join(filePath, 'index.md')
      parsedPath = path.parse(filePath)
      stat = await fs.stat(filePath)
    }

    const content = await fs.readFile(filePath, { encoding: 'utf-8' })

    const c = matter(content)

    const articleInfo: ArticleInfo = {
      publish: true,
      visible: true,
      title: parsedPath.name,
      routePath: routePath,
      date: new Date(stat.birthtimeMs),
      lastUpdateDate: new Date(stat.mtimeMs),
      tags: [],
    }

    const d = Object.assign(articleInfo, c.data)

    if (d.visible || isDev) {
      articles.push(d)
    }
  })

  await Promise.all(allPromise)
  // rm invisible

  const config: SiteConfig = {
    articles: articles,
  }

  const src = `
  const data = ${JSON.stringify(config)}
  export default data;
`

  return src
}
