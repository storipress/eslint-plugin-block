const { findLiteralAttr } = require('../utils/find-attr')

module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'disallow literal href value for LinkElement',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: 'code',
    messages: {
      literalHref: 'Found literal value for herf prop with LinkElement, please check again',
    },
    schema: [], // no options
  },
  create(context) {
    return context.parserServices.defineTemplateBodyVisitor({
      'VElement[rawName=LinkElement]'(node) {
        const attr = findLiteralAttr(node, 'href')
        // allow for `/`
        if (attr && attr.value.value !== '/') {
          context.report({
            node: attr,
            messageId: 'literalHref',
          })
        }
      },
    })
  },
}
