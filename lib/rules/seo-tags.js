const { findLiteralAttr } = require('../utils/find-attr')

const TAGS = {
  hero: ['h4', 'h2'],
  block: ['h4', 'h3'],
}

module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'checking seo tag to follow SEO spec',
      category: 'Possible Errors',
      recommended: true,
    },
    messages: {
      tagNotMatch: 'here possible should be `{{ tag }}`, please check again',
      notHeader: 'here possible should not use `{{ tag }}`, please check again',
      changeTag: 'change this to {{ tag }}',
    },
    hasSuggestions: true,
    schema: [], // no options
  },
  create(context) {
    const filename = context.getFilename()

    const isNavbar = filename.startsWith('navbar')
    let blockType = 'block'
    const sourceCode = context.getSourceCode()

    function checkSEOTag(node) {
      const text = sourceCode.getText(node)

      const attr = findLiteralAttr(node, 'component')

      if (!attr) {
        return
      }

      const isTitle = text.includes('article.title')
      // looks like author
      const isAuthor = text.includes('author')

      const isNonHeader = isAuthor || isNavbar
      const messageId = isNonHeader ? 'notHeader' : 'tagNotMatch'
      const expectedTag = isNonHeader ? 'p' : TAGS[blockType][isTitle ? 1 : 0]
      const actualTag = attr.value.value
      const isFail = isNonHeader ? actualTag.startsWith('h') : actualTag !== expectedTag

      const suggestData = { tag: expectedTag }
      const data = isNonHeader ? { tag: actualTag } : suggestData

      if (isFail) {
        context.report({
          node: attr,
          messageId,
          data,
          suggest: [
            {
              messageId: 'changeTag',
              data: suggestData,
              fix(fixer) {
                return fixer.replaceText(attr, `component="${expectedTag}"`)
              },
            },
          ],
        })
      }
    }

    return context.parserServices.defineTemplateBodyVisitor({
      'VElement[rawName=Block]'() {
        blockType = 'block'
      },
      'VElement[rawName=HeroBlock]'() {
        blockType = 'hero'
      },
      'VElement[rawName=TextInput]': checkSEOTag,
      'VElement[rawName=TextElement]': checkSEOTag,
    })
  },
}
