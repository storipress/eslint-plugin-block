module.exports = {
  rules: {
    'no-preview-text-with-slot': require('./rules/no-preview-text-with-slot'),
    'no-block-type': require('./rules/no-block-type'),
    'paragraph-order': require('./rules/paragraph-order'),
    'link-element-no-literal-href': require('./rules/link-element-no-literal-href'),
  },
  configs: {
    recommended: require('./configs/recommended'),
  },
}
