const { isBlockFile } = require('../utils/is-block-file')
const { findDirectiveAttr, findLiteralAttr } = require('../utils/find-attr')

module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'image possibly should have dynamic src value',
      category: 'Possible Errors',
      recommended: true,
      suggestion: true,
    },
    fixable: 'code',
    messages: {
      foundLiteralSrc: 'found src with literal value, this possible a error',
      replaceSrc: 'replace with :src="article.headline"',
    },
    hasSuggestions: true,
    schema: [], // no options
  },
  create(context) {
    if (!isBlockFile(context)) {
      return {}
    }

    function checkImage(node) {
      const dynamicSrcAttr = findDirectiveAttr(node, 'src')
      if (dynamicSrcAttr) {
        return
      }

      const srcAttr = findLiteralAttr(node, 'src')

      if (srcAttr) {
        context.report({
          node: srcAttr,
          messageId: 'foundLiteralSrc',
          suggest: [
            {
              messageId: 'replaceSrc',
              fix(fixer) {
                return fixer.replaceText(srcAttr, ':src="article.headline"')
              },
            },
          ],
        })
      }
    }

    return context.parserServices.defineTemplateBodyVisitor({
      'VElement[name=img]': checkImage,
    })
  },
}
