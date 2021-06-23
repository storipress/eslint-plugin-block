module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'disallow passing preview text with slot',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: 'code',
    messages: {
      passingWithSlot: 'Passing preview text with slot is deprecated, please run the autofixs',
    },
    schema: [], // no options
  },
  create(context) {
    function reportPassingWithSlot(node) {
      context.report({
        node,
        messageId: 'passingWithSlot',
        fix(fixer) {
          if (!node.endTag) {
            return
          }
          // remove from the end angle of start tag to end tag
          return fixer.replaceTextRange([node.startTag.range[1] - 1, node.endTag.range[1]], '/>')
        },
      })
    }
    return context.parserServices.defineTemplateBodyVisitor({
      'VElement[rawName=Header1][children.length > 0]': reportPassingWithSlot,
      'VElement[rawName=Header2][children.length > 0]': reportPassingWithSlot,
      'VElement[rawName=Blockquote][children.length > 0]': reportPassingWithSlot,
      'VElement[rawName=Paragraph][children.length > 0]': reportPassingWithSlot,
    })
  },
}
