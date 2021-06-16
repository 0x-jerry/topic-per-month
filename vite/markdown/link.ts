// modified based on https://github.com/vuejs/vitepress/blob/HEAD/src/node/markdown/plugins/link.ts
// markdown-it plugin for:
// 1. adding target="_blank" to external links
// 2. normalize internal links
import { URL } from 'url'
import MarkdownIt from 'markdown-it'

const indexRE = /(^|.*\/index).md(#?.*)$/i

// use vue component instead of `a`
const renderTag = 'v-link'

export const linkPlugin = (md: MarkdownIt, externalAttrs: Record<string, string>) => {
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')
    token.tag = renderTag

    if (hrefIndex >= 0) {
      const hrefAttr = token.attrs![hrefIndex]
      const url = hrefAttr[1]
      const isExternal = /^https?:/.test(url)
      if (isExternal) {
        Object.entries(externalAttrs).forEach(([key, val]) => {
          token.attrSet(key, val)
        })
      } else if (
        // internal anchor links
        !url.startsWith('#') &&
        // mail links
        !url.startsWith('mailto:')
      ) {
        normalizeHref(hrefAttr)
      }
    }
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    token.tag = renderTag

    return self.renderToken(tokens, idx, options)
  }

  function normalizeHref(hrefAttr: [string, string]) {
    let url = hrefAttr[1]

    const indexMatch = url.match(indexRE)
    if (indexMatch) {
      const [, path, hash] = indexMatch
      url = path + hash
    } else {
      let cleanUrl = url.replace(/\#.*$/, '').replace(/\?.*$/, '')
      // .md -> ''
      if (cleanUrl.endsWith('.md')) {
        cleanUrl = cleanUrl.replace(/\.md$/, '')
      }

      const parsed = new URL(url, 'http://a.com')
      url = cleanUrl + parsed.search + parsed.hash
    }

    // ensure leading . for relative paths
    if (!url.startsWith('/') && !/^\.\//.test(url)) {
      url = './' + url
    }

    // markdown-it encodes the uri
    hrefAttr[1] = decodeURI(url)
  }
}
