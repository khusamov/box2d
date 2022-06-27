import {Rule} from 'anubis-rule-system'
import {StartGameMessage} from '../messages/StartGameMessage'
import {UpdateMessage} from 'anubis-game-system-2'
import {DataStorageFasade, isData} from 'anubis-data-storage'
import {IdentificationData} from '../data/IdentificationData'
import {BallStateData, BallStateType} from '../data/BallStateData'
import {RigidbodyData} from 'anubis-physic-system'
import {Vec2} from 'planck'

/**
 * Для запуска игры требуется отправить сообщение StartGameMessage.
 */
export class StartGameRule extends Rule {
	public init(): void {
		this.messageEmitter.once(StartGameMessage, () => {
			this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
				const dataStorageFasade = new DataStorageFasade(dataStorage)
				const ballEntity = (
					dataStorageFasade
						.createEntityCollection(IdentificationData)
						.find(({type}) => type === 'Ball')
				)
				if (ballEntity) {
					const ballStateData = ballEntity.find(isData(BallStateData))
					const rigidbodyData = ballEntity.find(isData(RigidbodyData))
					if (ballStateData && rigidbodyData && rigidbodyData.body) {
						dataStorageFasade.createDataFasade(ballStateData).replace(new BallStateData(BallStateType.Moving))
						rigidbodyData.body.applyForceToCenter(new Vec2(0, 4000))
					}
				}
			})
		})
	}
}