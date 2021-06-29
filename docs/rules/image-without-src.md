# error about missing `src` prop for `img`

with [image-with-literal-src](./image-image-with-literal-src.md), this can catch missing src value

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
