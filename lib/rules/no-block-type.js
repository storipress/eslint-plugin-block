module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'disallow using of deprecated blockType',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: 'code',
    messages: {
      foundBlockType: 'Using blockType is deprecated, please run autofixs',
    },
    schema: [], // no options
  },
  create(context) {
    function reportBlockType(node) {
      context.report({
        node,
        messageId: 'foundBlockType',
        fix(fixer) {
          return fixer.remove(node)
        },
      })
    }
    return context.parserServices.defineTemplateBodyVisitor({
      'VAttribute[key.name=blockType]': reportBlockType,
    })
  },
}
