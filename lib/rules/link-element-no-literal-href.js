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
        const attr = node.startTag.attributes.find((attr) => !attr.directive && attr.key.name === 'href')
        if (attr) {
          context.report({
            node: attr,
            messageId: 'literalHref',
          })
        }
      },
    })
  },
}
