const test = require('ava')
const avaRuleTester = require('eslint-ava-rule-tester')

exports.ruleTester = avaRuleTester(test, {
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    es6: true,
  },
})
