ECS-система Анубис
==================

Отличия в терминологии от ECS
-----------------------------
Entity  
Component = Data  
System = Rule  

Основные элементы системы
-------------------------

Game - Инициализация игры, пауза, остановка, удаление игры
Entity - Игровая сущность (массив данных Data)
Data - Игровые данные (простой объект с методом clone())
Rule - Игровое правило (шаблон ICommand)
Level - Группировка правил и сообщений для одного уровня игры
Feature - Группировка правил в одну особенность игры
Message - Сообщение внутри игры (широковещательное)

Запуск игры
-----------

```typescript
import {Level} from 'anubis-rule-system'
import {GameCreator} from './classes/GameCreator'

const game = new GameCreator(new Level).create()

game.start()
const timeInterval = 0
game.update(timeInterval)
game.pause()
game.toggle()
game.dispose()
```