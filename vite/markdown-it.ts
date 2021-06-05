import MarkdownIt from 'markdown-it'
import prism from 'markdown-it-prism'
import anchor from 'markdown-it-anchor'
import emoji from 'markdown-it-emoji'
// @ts-ignore
import toc from 'markdown-it-table-of-contents'

export function setupMarkdownIt(md: MarkdownIt) {
  md.use(prism)
    .use(emoji)
    .use(anchor, {
      permalinkSymbol: '#',
    })
    .use(toc, {
      includeLevel: [2, 3],
    })
    .use(linkPlugin, {
      target: '_blank',
      rel: 'noopener noreferrer',
    })
}

// modified based on https://github1s.com/vuejs/vitepress/blob/HEAD/src/node/markdown/plugins/link.ts
// markdown-it plugin for:
// 1. adding target="_blank" to external links
// 2. normalize internal links
import { URL } from 'url'

const indexRE = /(^|.*\/)index.md(#?.*)$/i

export const linkPlugin = (md: MarkdownIt, externalAttrs: Record<string, string>) => {
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')
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