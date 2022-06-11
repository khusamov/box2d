import {Order} from '../data/Order'
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment'
import {isData} from '../base/interfaces/IData'
import {Identification} from '../data/Identification'
import {Rigidbody} from '../data/Rigidbody'
import {Vec2} from 'planck'

export class BatMoveOrder extends Order {
	public constructor(
		public movementX: number,
		public movementY: number
	) {
		super()
	}

	public override execute({entityList}: IGameEnvironment) {
		const batEntity = entityList.find(entity => {
			const identification = entity.find(isData(Identification))
			return identification && identification.type === 'Bat'
		})
		if (batEntity) {
			const batRigidbodyData = batEntity.find(isData(Rigidbody))
			if (batRigidbodyData && batRigidbodyData.body) {
				batRigidbodyData.body.setPosition(
					new Vec2(
						batRigidbodyData.body.getPosition().x + this.movementX,
						batRigidbodyData.body.getPosition().y
					)
				)
			}
		}
	}
}