anubis-deletion-system
==================

Для использования системы удаления сущностей нужно придерживаться нескольких правил:

Внешние данные пометить как IExternalData
-----------------------------------------

Все данные с внешними ссылками нужно помечать интерфейсом `IExternalData`. Например:

```typescript
import {Body} from 'planck'
import {IBodyDef} from '../interfaces/IBodyDef'
import {Data} from 'anubis-data-storage'
import {externalDataSymbol, IExternalData} from 'anubis-deletion-system'

/**
 * Данные для создания твердого тела.
 * Могут содержаться только в корне сущности, для которой создается твердое тело.
 */
export class RigidbodyData extends Data implements IExternalData {
	public readonly [externalDataSymbol] = true

	public constructor(
		public readonly bodyDef: IBodyDef,
		public readonly body?: Body
	) {
		super()
	}
}
```

Расширить правило DeletionRule
------------------------------

Для удаления сущностей с игровыми данными, содержащими внешние ссылки 
создать правила, расширяющие `DeletionRule`. Например:

```typescript
import {DeletionRule} from 'anubis-deletion-system'
import {DataStorage, DataStorageFasade, IEntity, isData} from 'anubis-data-storage'
import {RigidbodyData} from '../data/RigidbodyData'
import {PhysicWorldData} from '../data/PhysicWorldData'

export class RigidbodyDeletionRule extends DeletionRule {
	protected deletion(deletedEntity: IEntity) {
		const body = deletedEntity.find(isData(RigidbodyData))?.body
		const world = new DataStorageFasade(this.context.dataStorage).find(isData(PhysicWorldData))?.world
		if (body && world) {
			world.destroyBody(body)
		}
	}
}
```

Правило удаления сущностей
--------------------------

В игру нужно добавить правило `EntityDeletionRule`.

Как удалить сущность?
---------------------

Для удаления сущности нужно добавить в нее маркер `DeletedMarkData`.