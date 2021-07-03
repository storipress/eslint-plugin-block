const { ruleTester } = require('../_helper')
const rule = require('../../lib/rules/headline-image-missing-alt')
const { TEST_BLOCK_FILE } = require('../../lib/utils/is-block-file')

ruleTester.run('headline-image-missing-alt', rule, {
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
    <img :src="article.headline" />
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <img :src="article.headline" :alt="article.headlineAlt" />
  </template>
  `,
      filename: TEST_BLOCK_FILE,
    },
  ],
  invalid: [
    {
      code: `
  <template>
    <img :src="article.headline" />
  </template>
  `,
      output: `
  <template>
    <img :alt="article.headlineAlt" :src="article.headline" />
  </template>
  `,
      filename: TEST_BLOCK_FILE,
      errors: [
        {
          messageId: 'missingAlt',
        },
      ],
    },
    {
      code: `
  <template>
    <img :src="article.headline" alt="article.headlineAlt" />
  </template>
  `,
      output: `
  <template>
    <img :src="article.headline" :alt="article.headlineAlt" />
  </template>
  `,
      filename: TEST_BLOCK_FILE,
      errors: [
        {
          messageId: 'foundLiteralAlt',
        },
      ],
    },
  ],
})
