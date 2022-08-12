import {DataStorageFacade} from 'anubis-data-storage'
import {DeletionRule} from 'anubis-deletion-system'
import {IEntity, isData} from 'anubis-data-storage'
import {UpdateMessage} from 'anubis-game-system/src'
import {RigidbodyData} from '../data/RigidbodyData'
import {PhysicWorldData} from '../data/PhysicWorldData'

export class RigidbodyDeletionRule extends DeletionRule {
	protected deletion(deletedEntity: IEntity) {
		const rigidbodyData = deletedEntity.find(isData(RigidbodyData))

		if (rigidbodyData) {
			const dataStorageFacade = new DataStorageFacade(this.context.dataStorage)
			const world = dataStorageFacade.find(isData(PhysicWorldData))?.world
			if (world) {

				const destroyBody = () => {
					// Удалить твердое тело.
					const body = rigidbodyData.body
					if (body) {
						world.destroyBody(body)
					}
					// Удалить игровые данные о твердом теле.
					dataStorageFacade.createDataFasade(rigidbodyData).delete()
				}

				if (world.isLocked()) {
					this.context.messageEmitter.once(UpdateMessage, () => destroyBody())
				} else {
					destroyBody()
				}
			}
		}
	}
}