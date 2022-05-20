# box2d
Исследование библиотеки box2d

Box2D  
https://www.npmjs.com/package/@box2d/core  
https://github.com/flyover/box2d.ts

Top Games made with Box2D tagged 2D  
https://itch.io/games/made-with-box2d/tag-2d

.yarnrc.yml
-----------

Файла .yarnrc.yml недостаточно. Мало того, он даже мешает. В нем приходится удалять информацию о плагинах и заново их устанавливать.
Отсюда вывод, что файл .yarnrc.yml по идее нельзя хранить в репозитории. Это очень странно.

```
yarn plugin import typescript
yarn plugin import workspace-tools
```