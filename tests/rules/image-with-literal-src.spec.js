const { ruleTester } = require('../_helper')
const rule = require('../../lib/rules/image-with-literal-src')
const { TEST_BLOCK_FILE } = require('../../lib/utils/is-block-file')

ruleTester.run('image-with-literal-src', rule, {
  valid: [
    {
      code: `
  <template>
    <img src="foo" />
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
  ],
  invalid: [
    {
      code: `
  <template>
    <img src="foo" />
  </template>
  `,
      filename: TEST_BLOCK_FILE,
      errors: [
        {
          messageId: 'foundLiteralSrc',
          suggestions: [
            {
              messageId: 'replaceSrc',
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
