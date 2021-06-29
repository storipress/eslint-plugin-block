const { ruleTester } = require('../_helper')
const rule = require('../../lib/rules/image-without-src')
const { TEST_BLOCK_FILE } = require('../../lib/helpers/is-block-file')

ruleTester.run('image-with-literal-src', rule, {
  valid: [
    {
      code: `
  <template>
    <img />
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <img :src="foo" />
  </template>
  `,
      filename: TEST_BLOCK_FILE,
    },
    {
      code: `
  <template>
    <img src="foo" />
  </template>
  `,
      filename: TEST_BLOCK_FILE,
    },
  ],
  invalid: [
    {
      code: `
  <template>
    <img />
  </template>
  `,
      filename: TEST_BLOCK_FILE,
      errors: [
        {
          messageId: 'missingSrc',
          suggestions: [
            {
              messageId: 'insertSrcAttr',
              output: `
  <template>
    <img :src="article.headline" />
  </template>
  `,
            },
          ],
        },
      ],
    },
  ],
})
