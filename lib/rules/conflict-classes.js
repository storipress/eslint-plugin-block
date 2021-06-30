const CONFLICT_PATTERN = [/text-.*/, /leading-.*/, /font-.*/]
const CONFLICT_NAMES = new Set(['uppercase', 'lowercase', 'capitalize', 'underline'])

module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'checking class which may conflict with props',
      category: 'Possible Errors',
      recommended: true,
    },
    messages: {
      conflictClass: 'found class `{{ name }}` may conflict with prop',
    },
    schema: [], // no options
  },
  create(context) {
    const sourceCode = context.getSourceCode()

    function checkClasses(node) {
      const { rawName } = node.parent.parent
      // only check our elements
      if (rawName !== 'TextInput' && rawName !== 'TextElement') {
        return
      }
      const start = node.value.range[0]
      const { value } = node.value
      const classes = value.split(' ').map((raw) => {
        const parts = raw.split(':')
        return {
          raw,
          className: parts[parts.length - 1],
        }
      })

      for (const { raw, className } of classes) {
        if (CONFLICT_PATTERN.some((pattern) => className.match(pattern))) {
          reportValue(value, raw)
          continue
        }
        if (CONFLICT_NAMES.has(className)) {
          reportValue(value, raw)
        }
      }

      function reportValue(fullClass, className) {
        const pos = fullClass.indexOf(className)
        context.report({
          loc: {
            start: sourceCode.getLocFromIndex(start + pos),
            end: sourceCode.getLocFromIndex(start + pos + className.length),
          },
          messageId: 'conflictClass',
          data: { name: className },
        })
      }
    }

    return context.parserServices.defineTemplateBodyVisitor({
      'VAttribute[directive=false][key.name=class]': checkClasses,
    })
  },
}
