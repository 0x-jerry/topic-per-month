import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import emoji from 'markdown-it-emoji'
// @ts-ignore
import toc from 'markdown-it-table-of-contents'
import MarkdownItContainer from 'markdown-it-container'
import { linkPlugin } from './link'
import { createMdContainerOption } from './container'
import { preWrapperPlugin } from './preWrapper'
import { lineNumberPlugin } from './lineNumber'
import { highlightLinePlugin } from './highlightLines'

export function setupMarkdownIt(md: MarkdownIt) {
  md.use(emoji)
    .use(anchor, {
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '#',
      permalinkAttrs: () => ({ 'aria-hidden': true }),
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
    .use(MarkdownItContainer, 'vue-container', createMdContainerOption(':'))
    .use(MarkdownItContainer, 'vue-slot', createMdContainerOption(';'))
}
