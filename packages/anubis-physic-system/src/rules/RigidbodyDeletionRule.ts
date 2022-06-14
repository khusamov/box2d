import {Rule} from 'anubis-rule-system'
import {DataAddingMessage, DataStorageFasade, isData} from 'anubis-data-storage'
import {DeletedMarkData, UpdateMessage} from 'anubis-game-system-2'
import {RigidbodyData} from '../data/RigidbodyData'
import {PhysicWorldData} from '../data/PhysicWorldData'

export class RigidbodyDeletionRule extends Rule {
	public init() {
		this.messageEmitter.on(DataAddingMessage, ({data}) => {
			if (data instanceof DeletedMarkData) {
				this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
					const deletedEntity = new DataStorageFasade(dataStorage).createDataFasade(data).entity
					const body = deletedEntity.find(isData(RigidbodyData))?.body
					const world = new DataStorageFasade(dataStorage).find(isData(PhysicWorldData))?.world
					if (body && world) {
						world.destroyBody(body)

						// TODO Сделать удаление только данных Rigidbody, а удаление самой сущности
						//  должно выполнять правило, которое отслеживает сущности с Deleted, но без данных.
						new DataStorageFasade(dataStorage).deleteEntity(deletedEntity)
					}
				})
			}
		})
	}
}