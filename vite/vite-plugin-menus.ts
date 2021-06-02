import path from 'path'
import { promises as fs } from 'fs'
import { Plugin } from 'vite'

const virtualModuleId = 'virtual:menus'

export function VitePluginMenus(docsDir: string): Plugin {
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
    menus.push(file)
  }

  const src = `
  const data = ${JSON.stringify(menus)}
  export default data;
`

  return src
}
