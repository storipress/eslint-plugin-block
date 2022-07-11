# prevent import of both SDK modules

## Fail

```js
import {} from '@storipress/block'
import {} from '@storipress/article'
```

## Pass

```js
import {} from '@storipress/block'
```

```js
import {} from '@storipress/article'
```
