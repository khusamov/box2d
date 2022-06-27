ECS-система Анубис
==================

Отличия в терминологии от ECS
-----------------------------
Entity  
Component = Data  
System = Rule  

Основные элементы системы
-------------------------

Anubis - Регистрация основных элементов системы
Game - Инициализация игры, пауза, остановка, удаление игры
       Массив с игровыми сущностями и данными
Entity - Игровая сущность (массив данных Data)
Data - Игровые данные (простой объект с методом clone())
Rule - Игровое правило (шаблон ICommand)
Level - Группировка правил и сообщений для одного уровня игры
Feature - Группировка правил в одну особенность игры


MessageBroker - Игровые сообщения (широковещательные, аналог шины сообщений)
Message - Сообщение внутри игры (широковещательное)

CommandQueue - Очередь команд



Создание сущности
-----------------



```typescript

```

Запуск игры
-----------

```typescript
import {Level} from 'anubis-rule-system'
import {GameCreator} from 'anubis-game-system-2'

const game = new GameCreator(new Level).create()

game.init()
game.start()
game.update(0)
game.pause()
game.dispose()
```