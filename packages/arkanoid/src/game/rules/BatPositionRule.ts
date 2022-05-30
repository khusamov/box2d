import {IRule} from '../base/interfaces/IRule';
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment';
import {hasData} from '../base/Entity';
import {Mouse} from '../data/Mouse';
import {isData} from '../base/interfaces/IData';
import {Identification} from '../data/Identification';
import {Rigidbody} from '../data/Rigidbody';
import {Vec2} from 'planck';

/**
 * Вместо BatPositionRule используйте BatMoveOrder.
 * @deprecated
 */
export class BatPositionRule implements IRule {
	private game: IGameEnvironment | undefined

	init(game: IGameEnvironment) {
		this.game = game
	}

	update() {
		if (this.game) {
			const {entityList} = this.game

			const mouseEntity = entityList.find(hasData(Mouse))

			const batEntity = entityList.find(entity => {
				const identification = entity.find(isData(Identification))
				return identification && identification.type === 'Bat'
			})

			if (mouseEntity && batEntity) {
				const mouse = mouseEntity.find(isData(Mouse))
				const batRigidbodyData = batEntity.find(isData(Rigidbody))
				if (mouse && batRigidbodyData && batRigidbodyData.body) {
					batRigidbodyData.body.setPosition(
						new Vec2(
							// mouse.x,
							batRigidbodyData.body.getPosition().x + mouse.movementX,
							batRigidbodyData.body.getPosition().y
						)
					)
				}
			}
		}
	}
}