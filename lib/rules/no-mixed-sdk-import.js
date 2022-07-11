module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'disallow mixed sdk import',
      category: 'Possible Errors',
      recommended: true,
    },
    messages: {
      foundMixedImport: 'Using @storipress/block and @storipress/article together is not allowed',
    },
    schema: [], // no options
  },
  create(context) {
    let blockImport = false
    let articleImport = false

    return {
      ImportDeclaration(node) {
        const { source } = node
        if (source.value === '@storipress/block') {
          blockImport = true
        }
        if (source.value === '@storipress/article') {
          articleImport = true
        }

        if (blockImport && articleImport) {
          context.report({
            node,
            messageId: 'foundMixedImport',
          })
        }
      },
    }
  },
}
