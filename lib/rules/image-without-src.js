const { isBlockFile } = require('../helpers/is-block-file')
const { findDirectiveAttr, findLiteralAttr } = require('../helpers/find-attr')
const { insertProp } = require('../helpers/insert-prop')

module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'image should have src value',
      category: 'Possible Errors',
      recommended: true,
      suggestion: true,
    },
    fixable: 'code',
    messages: {
      missingSrc: 'found src with literal value, this possible a error',
      insertSrcAttr: 'insert :src="article.headline"',
    },
    schema: [], // no options
  },
  create(context) {
    if (!isBlockFile(context)) {
      return {}
    }

    function checkImage(node) {
      if (findDirectiveAttr(node, 'src') || findLiteralAttr(node, 'src')) {
        return
      }

      context.report({
        node,
        messageId: 'missingSrc',
        suggest: [
          {
            messageId: 'insertSrcAttr',
            fix(fixer) {
              return insertProp(fixer, node, ':src="article.headline"')
            },
          },
        ],
      })
    }

    return context.parserServices.defineTemplateBodyVisitor({
      'VElement[name=img]': checkImage,
    })
  },
}
