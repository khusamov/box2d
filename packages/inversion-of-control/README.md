Контейнер инверсии управления
=============================

Создан на основе:  
https://github.com/khusamov/solid-futurio-ru-game/tree/main/packages/khusamov-inversion-of-control

Значительно переработан и описание пока не соответствует внесенным правкам.

Предыдущее описание (устарело)
------------------------------

Простая реализация шаблона проектирования '[Контейнер инверсии управления][ioc]' (Inversion оf Control Container).

[ioc]: https://bit.ly/35sJch2

Пример использования:
---------------------

```typescript
import {register, resolve} from 'khusamov-inversion-of-control';

function myDependencyResolver(): string[] {
	return ['Apple', 'iPhone', 'iPad']
}

// Регистрация зависимости.
register('myDependency', myDependencyResolver)

// Разрешение зависимости.
const arr1 = resolve<string[]>('myDependency')
```

Строгий вариант вызова `resolve()`
----------------------------------

```typescript
import {register, resolve, TResolverFunction} from 'khusamov-inversion-of-control';

// Где-то есть класс Pirat, который был создан неизвестным разработчиком.
class Pirat {
	// ...
}

// Регистрируем зависимость Pirat, которая будет возвращать экземпляр класса Pirat.
type TPiratResolver = (weapons: string[], bomb: number) => Pirat
const piratResolver: TPiratResolver = (weapons, bomb) => { return new Pirat }
register('Pirat', piratResolver)

// Разрешаем зависимость в строгом (через тип или через функцию) и обычном режиме:
resolve<Pirat, TPiratResolver>('Pirat', [], 1)
resolve<Pirat, typeof piratResolver>('Pirat', [], 1)
resolve<Pirat>('Pirat', [], 1)
```