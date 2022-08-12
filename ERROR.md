Найденные ошибки
================

No transformers found for index.html
------------------------------------

```
@parcel/core: No transformers found for packages/arkanoid/src/index.html with pipeline: 'types'.
```

В файле `package.json` следует удалить следующие узлы:

```json
{
	"main": "dist/main.js",
	"module": "dist/module.js",
	"types": "dist/types.d.ts"
}
```

Не правильная генерация строки импорта `import {IDisposable} from 'base-types/src'`
---------------------------------------------------------------------------------

Пока не ясно как исправить эту ошибку. Она похоже связана со средой разработки IDEA.

```typescript
import {IDisposable} from 'base-types/src'
```

Откуда здесь взялась строка `/src`?