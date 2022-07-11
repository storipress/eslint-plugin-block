const { ruleTester } = require('../_helper')
const rule = require('../../lib/rules/no-mixed-sdk-import')

ruleTester.run('no-mixed-sdk-import', rule, {
  valid: [
    {
      code: `
      import { DeskSection } from '@storipress/block'
  `,
      filename: 'test.js',
    },
    {
      code: `
      import { HeadlineCaption } from '@storipress/article'
  `,
      filename: 'test.js',
    },
    {
      code: `
  <script>
    import { DeskSection } from '@storipress/block'
  </script>
  `,
      filename: 'test.vue',
    },
  ],
  invalid: [
    {
      code: `
      import { DeskSection } from '@storipress/block'
      import { HeadlineCaption } from '@storipress/article'
  `,
      filename: 'test.js',
      errors: [{ messageId: 'foundMixedImport' }],
    },
    {
      code: `
  <script>
    import { DeskSection } from '@storipress/block'
    import { HeadlineCaption } from '@storipress/article'
  </script>
  `,
      filename: 'test.vue',
      errors: [{ messageId: 'foundMixedImport' }],
    },
  ],
})
