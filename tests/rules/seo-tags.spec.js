const { ruleTester } = require('../_helper')
const rule = require('../../lib/rules/seo-tags')

ruleTester.run('seo-tags', rule, {
  valid: [
    {
      code: `
  <template>
    <TextElement kind="foo" component="h3">{{ article.title }}</TextElement>
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <TextInput kind="foo" component="h4" :defaultValue="desk" />
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <Block>
      <TextElement kind="foo" component="h3">{{ article.title }}</TextElement>
    </Block>
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <Block>
      <TextInput kind="foo" component="h4" :defaultValue="desk" />
    </Block>
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <HeroBlock>
      <TextElement kind="foo" component="h2">{{ article.title }}</TextElement>
    </HeroBlock>
  </template>
  `,
      filename: 'test.vue',
    },
    {
      code: `
  <template>
    <HeroBlock>
      <TextInput kind="foo" component="h4" :defaultValue="desk" />
    </HeroBlock>
  </template>
  `,
      filename: 'test.vue',
    },
  ],
  invalid: [
    {
      code: `
  <template>
    <Block>
      <TextElement kind="foo" component="h2">
        {{ article.title }}
      </TextElement>
    </Block>
  </template>
  `,
      filename: 'test.vue',
      errors: [
        {
          messageId: 'tagNotMatch',
          data: { tag: 'h3' },
          suggestions: [
            {
              messageId: 'changeTag',
              data: { tag: 'h3' },
              output: `
  <template>
    <Block>
      <TextElement kind="foo" component="h3">
        {{ article.title }}
      </TextElement>
    </Block>
  </template>
  `,
            },
          ],
        },
      ],
    },
    {
      code: `
  <template>
    <Block>
      <TextInput kind="foo" component="h2" :defaultValue="desk" />
    </Block>
  </template>
  `,
      filename: 'test.vue',
      errors: [
        {
          messageId: 'tagNotMatch',
          data: { tag: 'h4' },
          suggestions: [
            {
              messageId: 'changeTag',
              data: { tag: 'h4' },
              output: `
  <template>
    <Block>
      <TextInput kind="foo" component="h4" :defaultValue="desk" />
    </Block>
  </template>
  `,
            },
          ],
        },
      ],
    },
    {
      code: `
  <template>
    <HeroBlock>
      <TextInput kind="foo" component="h1" :defaultValue="desk" />
    </HeroBlock>
  </template>
  `,
      filename: 'test.vue',
      errors: [
        {
          messageId: 'tagNotMatch',
          data: { tag: 'h4' },
          suggestions: [
            {
              messageId: 'changeTag',
              data: { tag: 'h4' },
              output: `
  <template>
    <HeroBlock>
      <TextInput kind="foo" component="h4" :defaultValue="desk" />
    </HeroBlock>
  </template>
  `,
            },
          ],
        },
      ],
    },
  ],
})
