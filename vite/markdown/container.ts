import Token from 'markdown-it/lib/token'

export const createMdContainerOption = (marker = ':') => {
  const tagQueue: string[] = []

  return {
    marker,
    validate: function(params: string) {
      return !!params
    },
    render: function(tokens: Token[], idx: number) {
      const token = tokens[idx]

      if (token.nesting === 1) {
        const info = token.info.trim()
        const [tag, props] = info.split(/\s+/)
        tagQueue.push(tag)

        // opening tag
        return `<${tag} ${props}>`
      } else {
        const tag = tagQueue.pop()
        // closing tag
        return `</${tag}>`
      }
    },
  }
}
