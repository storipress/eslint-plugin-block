const { isBlockFile } = require('../helpers/is-block-file')
const { findDirectiveAttr, findLiteralAttr } = require('../helpers/find-attr')

module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'headline image must have alt',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: 'code',
    messages: {
      missingAlt: 'found headline img tag without alt, please run autofix',
      foundLiteralAlt: 'found alt with literal value, please use `article.headlineAlt` instead, or run autofix',
    },
    schema: [], // no options
  },
  create(context) {
    if (!isBlockFile(context)) {
      return {}
    }

    function checkHeadline(node) {
      const srcAttr = findDirectiveAttr(node, 'src')
      // find src which include `headline`
      if (!srcAttr || !context.getSourceCode().getText(srcAttr).includes('headline')) {
        return
      }

      const altDirectiveAttr = findDirectiveAttr(node, 'alt')
      if (altDirectiveAttr) {
        return
      }

      const literalAltAttr = findLiteralAttr(node, 'alt')

      if (literalAltAttr) {
        context.report({
          node: literalAltAttr,
          messageId: 'foundLiteralAlt',
          fix(fixer) {
            return fixer.replaceText(literalAltAttr, ':alt="article.headlineAlt"')
          },
        })
      } else {
        context.report({
          node: node.startTag,
          messageId: 'missingAlt',
          fix(fixer) {
            const pos = node.startTag.range[0] + node.rawName.length + 1
            return fixer.insertTextAfterRange([pos, pos], ' :alt="article.headlineAlt"')
          },
        })
      }
    }

    return context.parserServices.defineTemplateBodyVisitor({
      'VElement[key.name=img]': checkHeadline,
    })
  },
}
