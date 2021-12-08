module.exports = {
  meta: {
    type: "problem",

    docs: {
        description: "disallow anchor tag within anchor tag",
        category: "Possible Errors",
        recommended: true
    },
    messages: {
      overlappingAnchorTag: '`{{ overlappingTagName }}` tag should not within `{{ tagName }}` tag'
    },
    schema: [] // no options
  },
  create(context) {
    function checkAnchorTag(node) {
      const anchorTag = ['a', 'LinkElement']
      let tag = node

      while (tag.parent) {
        const { rawName } = tag.parent

        tag = tag.parent
        if (rawName === 'template') break
        if (anchorTag.includes(rawName)) {
          context.report({
            node,
            messageId: 'overlappingAnchorTag',
            data: { 
              overlappingTagName: node.rawName,
              tagName: tag.rawName
            },
          })
          break
        }
      }
    }

    return context.parserServices.defineTemplateBodyVisitor({
      'VElement[rawName=Authors]': checkAnchorTag,
      'VElement[rawName=LinkElement]': checkAnchorTag,
      'VElement[rawName=a]': checkAnchorTag,
    })
  }
}
