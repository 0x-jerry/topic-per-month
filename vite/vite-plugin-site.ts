import path from 'path'
import { promises as fs } from 'fs'
import { Plugin, ResolvedConfig } from 'vite'

const virtualModuleId = 'virtual:site'
const hotUpdateId = virtualModuleId + ':hot'

let viteConf: null | ResolvedConfig = null
export function VitePluginSite(docsDir: string): Plugin {
  docsDir = path.resolve(docsDir)

  return {
    name: 'vite-plugin-site',
    enforce: 'post',
    configResolved(config) {
      viteConf = config
    },
    configureServer(server) {
      const { moduleGraph, watcher, ws } = server

      function fullReload(onlyInvalidate = false) {
        const module = moduleGraph.getModuleById(virtualModuleId)
        if (module) {
          moduleGraph.invalidateModule(module)
        }

        if (onlyInvalidate) {
          return
        }
        ws.send({
          type: 'full-reload',
        })
      }

      watcher.on('add', (file) => {
        if (file.startsWith(docsDir) && file.endsWith('.md')) {
          fullReload()
        }
      })

      watcher.on('unlink', (file) => {
        if (file.startsWith(docsDir) && file.endsWith('.md')) {
          fullReload()
        }
      })

      watcher.on('change', (file) => {
        if (file.startsWith(docsDir) && file.endsWith('.md')) {
          fullReload(true)
        }
      })
    },
    resolveId(id) {
      if (id === virtualModuleId) {
        return virtualModuleId
      }
    },
    async handleHotUpdate(ctx) {
      if (!ctx.file.startsWith(docsDir)) {
        return
      }

      const article = await getArticleConfig(ctx.file)

      ctx.server.ws.send({
        type: 'custom',
        event: hotUpdateId,
        data: article,
      })
    },
    async load(id) {
      if (id !== virtualModuleId) {
        return null
      }

      const config = await getSiteConfig(docsDir, viteConf?.env.DEV)

      const code = `
import { reactive } from 'vue'
const data = reactive(${JSON.stringify(config)})

if (import.meta.hot) {
  import.meta.hot.on("${hotUpdateId}", (articleData) => {
    const hit = data.articles.findIndex(a => a.routePath === articleData.routePath)
    if (hit >= 0) {
      data.articles[hit] = articleData
    } else {
      data.articles.push(articleData)
    }
  })
}

export default data;
`

      return {
        code,
      }
    },
  }
}

import matter from 'gray-matter'
import { ArticleInfo, SiteConfig } from 'virtual:site'

async function getSiteConfig(dir: string, isDev: boolean) {
  const articles: ArticleInfo[] = []

  const files = await fs.readdir(path.resolve(dir))

  const allPromise = files.map(async (file) => {
    let filePath = path.join(dir, file)
    const stat = await fs.stat(filePath)

    if (stat.isDirectory()) {
      filePath = path.join(filePath, 'index.md')
    }

    const d = await getArticleConfig(filePath)

    if (d.visible || isDev) {
      articles.push(d)
    }
  })

  await Promise.all(allPromise)
  articles.sort((a, b) => b.date - a.date)

  const config: SiteConfig = {
    articles: articles,
  }

  return config
}

async function getArticleConfig(filePath: string) {
  const parsedPath = path.parse(filePath)
  const stat = await fs.stat(filePath)

  const content = await fs.readFile(filePath, { encoding: 'utf-8' })

  const c = matter(content)

  const routePath = parsedPath.name === 'index' ? path.parse(parsedPath.dir).name : parsedPath.name

  const articleInfo: ArticleInfo = {
    publish: true,
    visible: true,
    title: parsedPath.name,
    routePath: routePath,
    date: stat.birthtimeMs,
    lastUpdateDate: stat.mtimeMs,
    tags: [],
  }

  const d = Object.assign(articleInfo, c.data)

  return d
}
