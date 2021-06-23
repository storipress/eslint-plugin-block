module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'paragraph should have order prop',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: 'code',
    messages: {
      orderShouldBeInt: 'order prop should be int, please run the autofixes',
      orderNotFound: 'Paragraph should have order prop, please run the autofixes',
      orderNotCorrect: 'order seems has incorrect value, please run the autofixes',
    },
    schema: [], // no options
  },
  create(context) {
    function isStringOrder(attr) {
      return typeof attr.key.name === 'string' && attr.key.name === 'order'
    }

    function isOrderAttr(attr) {
      if (attr.type !== 'VAttribute' || !attr.key) {
        return false
      }

      if (isStringOrder(attr)) {
        return true
      }

      return (
        attr.key.name &&
        typeof attr.key.name === 'object' &&
        attr.key.name.name === 'bind' &&
        attr.key.argument.name === 'order'
      )
    }

    return context.parserServices.defineTemplateBodyVisitor({
      'VElement[rawName=Content]'(contentNode) {
        let i = 0
        for (const node of contentNode.children) {
          if (node.type !== 'VElement' || node.rawName !== 'Paragraph') {
            continue
          }
          const attr = node.startTag.attributes.find(isOrderAttr)
          if (!attr) {
            context.report({
              node: node.startTag,
              messageId: 'orderNotFound',
              fix(fixer) {
                const start = node.startTag.range[0] + node.rawName.length + 1
                return fixer.insertTextAfterRange([start, start], ` :order="${i}"`)
              },
            })
          } else if (isStringOrder(attr)) {
            context.report({
              node: attr,
              messageId: 'orderShouldBeInt',
              fix(fixer) {
                return fixer.replaceText(attr, `:order="${i}"`)
              },
            })
          } else if (
            attr.value &&
            attr.value.type === 'VExpressionContainer' &&
            (attr.value.expression.type !== 'Literal' || attr.value.expression.value !== i)
          ) {
            context.report({
              node: attr.value,
              messageId: 'orderNotCorrect',
              fix(fixer) {
                return fixer.replaceText(attr.value, `"${i}"`)
              },
            })
          }
          i += 1
        }
      },
    })
  },
}
