# fixing for deprecated passing preview text via slot

This rule is fixable.

## Fail

```vue
<template>
  <Header1>foo</Header1>
  <Header2>foo</Header2>
  <Blockquote>foo</Blockquote>
  <Paragraph>foo</Paragraph>
</template>
```

## Pass

```vue
<template>
  <Header1></Header1>
  <Header1 />
  <Header2></Header2>
  <Header2 />
  <Blockquote></Blockquote>
  <Blockquote />
  <Paragraph></Paragraph>
  <Paragraph />
</template>
```
