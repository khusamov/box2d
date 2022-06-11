import {Order} from '../data/Order'
import {isData} from '../base/interfaces/IData'
import {BallState, BallStateType} from '../data/BallState'
import {Identification} from '../data/Identification'
import {Rigidbody} from '../data/Rigidbody'
import {Vec2} from 'planck'
import {IGameEnvironment} from '../base/interfaces/IGameEnvironment'

export class StartGameOrder extends Order {
	public override execute(game: IGameEnvironment) {
		const ballEntity = game.entityList.find(entity => {
			const ballStateData = entity.find(isData(BallState))
			const identification = entity.find(isData(Identification))
			return identification && identification.type === 'Ball' && ballStateData && ballStateData.state === BallStateType.Stopped
		})
		if (ballEntity) {
			const ballStateData = ballEntity.find(isData(BallState))
			const ballRigidbodyData = ballEntity.find(isData(Rigidbody))
			if (ballStateData && ballRigidbodyData && ballRigidbodyData.body) {
				ballStateData.state = BallStateType.Moving
				ballRigidbodyData.body.applyForceToCenter(new Vec2(0, 3000))
			}
		}
	}
}