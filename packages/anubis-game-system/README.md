ECS-система Анубис
==================

Отличия в терминологии
----------------------
Entity  
Component = Data  
System = Rule  

Основные элементы системы
-------------------------

Anubis - Регистрация основных элементов системы
Game - Инициализация игры, пауза, остановка, удаление игры
Entity - Игровая сущность (массив данных Data)
Data - Игровые данные (простой объект с методом clone())
Rule - Игровое правило (шаблон ICommand)
Level - Группировка правил и сообщений для одного уровня игры
Feature - Группировка правил в одну особенность игры
Message - Сообщение внутри игры (широковещательное)

MessageEmitter - Игровые сообщения (широковещательные, аналог шины сообщений)
CommandQueue - Очередь команд
MessageQueue - Очередь сообщений

Краткое описание
----------------

Игровая сущность и ее данные это простые классы, экземпляры которых хранятся в массиве 

```typescript
resolve<Object[]>('EntityDataList')
```

Напрямую с EntityDataList не придется иметь дело.

Данные являются немутабельными объектами и поэтому следует пользоваться 
операцией EntityFasade.replace() для обновления данных.

Создание сущности
-----------------

Сущности требуется создать при помощи EntityCreator. 
В этом случае сообщение о создании сущности будет сгенерировано автоматически.

```typescript
import {EntityCreator} from 'anubis-game-system'

class PositionData {
	constructor(
		public readonly x: number, 
        public readonly y: number
    ) {}
}

const monsterEntity = EntityCreator.create(new PositionData(100, 100))
```

Запуск игры
-----------

```typescript
import {Game, ILevel} from 'anubis-game-system'
const level: ILevel = {
	rules: [],
    messages: []
}
Game.init(level)
Game.timer.start()
Game.dispose()
```