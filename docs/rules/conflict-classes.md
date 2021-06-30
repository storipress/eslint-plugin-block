# warning for using tailwindcss class which may conflict with our props

## Fail

```vue
<template>
  <TextElement class="text-sm" />
  <TextElement class="underline font-bold" />
  <TextInput class="md:underline sm:font-bold lg:uppercase" />
</template>
```

## Pass

```vue
<template>
  <TextElement class="foo bar" />
  <TextElement class="m-1 p-1" />
  <TextInput class="md:m-1 lg:p-1" />
  <!-- This rule only checks TextElement and TextInput -->
  <p class="font-sm" />
</template>
```
