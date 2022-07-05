import {DeletionRule} from 'anubis-deletion-system'
import {DataStorage, DataStorageFasade, IEntity, isData} from 'anubis-data-storage'
import {RigidbodyData} from '../data/RigidbodyData'
import {PhysicWorldData} from '../data/PhysicWorldData'

// TODO Добавить удаление RigidbodyData.

export class RigidbodyDeletionRule extends DeletionRule {
	protected deletion(deletedEntity: IEntity, dataStorage: DataStorage) {
		const body = deletedEntity.find(isData(RigidbodyData))?.body
		const world = new DataStorageFasade(dataStorage).find(isData(PhysicWorldData))?.world
		if (body && world) {
			world.destroyBody(body)
		}
	}
}