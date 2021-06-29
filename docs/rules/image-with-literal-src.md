# warning about literal value for `src` prop of `img`

with [image-without-src](./image-without-src.md), this can catch missing src value

This rule has suggested fixes.

## Fail

```vue
<template>
  <img src="foo" />
</template>
```

## Pass

```vue
<template>
  <img :src="foo" />
</template>
```
