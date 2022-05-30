import {IRule} from '../base/interfaces/IRule'
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment'
import {hasData} from '../base/Entity'
import {Deleted} from '../data/Deleted'
import {PlanckWorld} from '../data/PlanckWorld'
import {isData} from '../base/interfaces/IData'
import {Rigidbody} from '../data/Rigidbody'

export class RigidBodyDeleterRule implements IRule {
	private game: IGameEnvironment | undefined

	init(game: IGameEnvironment) {
		this.game = game
	}

	update(_timeInterval: number) {
		if (this.game) {
			const {entityList} = this.game

			const deletedEntity = entityList.find(hasData(Deleted))
			if (deletedEntity) {
				const planckWorldEntity = entityList.find(hasData(PlanckWorld))
				if (planckWorldEntity) {
					const world = planckWorldEntity.find(isData(PlanckWorld))?.world
					const deletedRigidbody = deletedEntity.find(isData(Rigidbody))?.body
					if (world && deletedRigidbody) {
						world.destroyBody(deletedRigidbody)


						// TODO Сделать удаление только данных Rigidbody, а удаление самой сущности
						//  должно выполнять правило, которое отслеживает сущности с Deleted, но без данных.
						entityList.splice(entityList.indexOf(deletedEntity), 1)
					}
				}
			}
		}
	}
}