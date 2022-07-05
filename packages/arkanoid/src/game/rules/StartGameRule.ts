import {Rule} from 'anubis-rule-system'
import {StartGameMessage} from '../messages/StartGameMessage'
import {UpdateMessage} from 'anubis-game-system'
import {DataStorageFasade, isData} from 'anubis-data-storage'
import {byType, IdentificationData} from '../data/IdentificationData'
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
						.find(byType('Ball'))
				)
				if (ballEntity) {
					const ballStateData = ballEntity.find(isData(BallStateData))
					const ballBody = ballEntity.find(isData(RigidbodyData))?.body
					if (ballStateData && ballBody) {
						dataStorageFasade.createDataFasade(ballStateData).replace(new BallStateData(BallStateType.Moving))
						ballBody.applyForceToCenter(
							new Vec2(
								0,
								2500 * ballBody.getMass()
							)
						)
					}
				}
			})
		})
	}
}