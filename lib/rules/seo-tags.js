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
      changeTag: 'change this to {{ tag }}',
    },
    schema: [], // no options
  },
  create(context) {
    const filename = context.getFilename()

    // guessing block type
    let blockType = filename.startsWith('navbar') ? 'hero' : 'block'
    const sourceCode = context.getSourceCode()

    function checkSEOTag(node) {
      const isTitle = sourceCode.getText(node).includes('article.title')
      const attr = findLiteralAttr(node, 'component')

      if (!attr) {
        return
      }

      const expectedTag = TAGS[blockType][isTitle ? 1 : 0]

      const data = { tag: expectedTag }

      if (attr.value.value !== expectedTag) {
        context.report({
          node: attr,
          messageId: 'tagNotMatch',
          data,
          suggest: [
            {
              messageId: 'changeTag',
              data,
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
