import {IRule} from '../base/interfaces/IRule';
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment';
import {Rigidbody} from '../data/Rigidbody';
import {PlanckWorld} from '../data/PlanckWorld';
import {isData} from '../base/interfaces/IData';
import {Identification} from '../data/Identification'

/**
 * Для новых сущностей без твердых тел требуется их создать.
 */
export class RigidbodyCreatorRule implements IRule {
	private game: IGameEnvironment | undefined

	init(game: IGameEnvironment) {
		this.game = game
	}

	update(_timeInterval: number) {
		if (this.game) {
			const {entityList} = this.game

			const rigidbodyEntityList = entityList.filter(
				// Выбираем сущности, для которых не созданы твердые тела.
				entity => {
					if (!entity.find(isData(Rigidbody))) {
						return false
					}
					return !entity.find(isData(Rigidbody))?.body
				}
			)

			const planckWorldData = entityList.find(entity => entity.find(isData(PlanckWorld)))?.find(isData(PlanckWorld))
			if (!planckWorldData || !planckWorldData.world) {
				return
			}

			for (const rigidbodyEntity of rigidbodyEntityList) {
				const rigidbodyData = rigidbodyEntity.find(isData(Rigidbody))

				if (!rigidbodyData) {
					throw new Error('Не найдены данные Rigidbody')
				}

				const identification = rigidbodyEntity.find(isData(Identification))

				rigidbodyData.body = planckWorldData.world.createBody({
					userData: {identification, entity: rigidbodyEntity} || {},
					...rigidbodyData.parameters
				})
			}
		}
	}
}