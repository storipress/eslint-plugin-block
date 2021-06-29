# error about missing `src` prop for `img`

with [image-with-literal-src](./image-image-with-literal-src.md), this can catch missing src value

This rule has suggested fixes.

## Fail

```vue
<template>
  <img />
</template>
```

## Pass

```vue
<template>
  <img :src="foo" />
  <img src="foo" />
</template>
```
