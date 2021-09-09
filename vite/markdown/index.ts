import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import emoji from 'markdown-it-emoji'
// @ts-ignore
import toc from 'markdown-it-table-of-contents'
import { linkPlugin } from './link'
import { preWrapperPlugin } from './preWrapper'
import { lineNumberPlugin } from './lineNumber'
import { highlightLinePlugin } from './highlightLines'

export function setupMarkdownIt(md: MarkdownIt) {
  md.use(emoji)
    .use(anchor, {
      permalink: anchor.permalink.ariaHidden({
        placement: 'before',
      }),
    })
    .use(toc, {
      includeLevel: [2, 3],
    })
    .use(linkPlugin, {
      target: '_blank',
      rel: 'noopener noreferrer',
    })
    .use(highlightLinePlugin)
    .use(preWrapperPlugin)
    .use(lineNumberPlugin)
}
