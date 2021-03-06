# box2d
Исследование библиотеки box2d

Демка:  
https://khusamov.github.io/box2d/

ECS  
https://en.wikipedia.org/wiki/Entity_component_system  
https://habr.com/ru/company/mygames/blog/590953/  
https://github.com/Doraku/DefaultEcs  
https://github.com/Doraku/DefaultEcs/tree/master/source/Sample  

Документация на Planck  
https://github.com/shakiba/planck.js/wiki

Box2D  
https://www.npmjs.com/package/@box2d/core  
https://github.com/flyover/box2d.ts

Rewrite of Box2D physics engine  
https://github.com/shakiba/planck.js

Top Games made with Box2D tagged 2D  
https://itch.io/games/made-with-box2d/tag-2d

.yarnrc.yml
-----------

Файла `.yarnrc.yml` недостаточно. Мало того, он даже мешает. В нем приходится удалять информацию о плагинах 
и заново их устанавливать. Отсюда вывод, что файл `.yarnrc.yml` по идее нельзя хранить в репозитории. 
Это очень странно, потому что в нем есть опции, которые надо хранить в репозитории (например `nodeLinker: node-modules`).

В общем, нужно в файле `.yarnrc.yml` удалить раздел `plugins` и выполнить команды:

```
yarn plugin import typescript & yarn plugin import workspace-tools
```