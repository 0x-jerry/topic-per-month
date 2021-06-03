import path from 'path'
import { promises as fs } from 'fs'
import { Plugin } from 'vite'

const virtualModuleId = 'virtual:site'

export function VitePluginSite(docsDir: string): Plugin {
  docsDir = path.resolve(docsDir)

  return {
    name: 'vite-i18n-plugin',
    resolveId(source) {
      if (source === virtualModuleId) {
        return source
      }
    },
    async load(id) {
      if (id !== virtualModuleId) {
        return null
      }

      const code = await generateCode(docsDir)

      return {
        code,
      }
    },
  }
}

async function generateCode(dir: string) {
  const menus = []

  const files = await fs.readdir(path.resolve(dir))

  for (const file of files) {
    menus.push(file.split('.').shift())
  }

  const config = {
    menus,
  }

  const src = `
  const data = ${JSON.stringify(config)}
  export default data;
`

  return src
}
