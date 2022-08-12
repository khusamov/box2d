import {DataStorageFacade, isData} from 'anubis-data-storage'
import {RigidbodyData} from 'anubis-physic-system'
import {Rule} from 'anubis-rule-system'
import {Vec2} from 'planck'
import {BallStateData, BallStateType} from '../data/BallStateData'
import {byType, IdentificationData} from '../data/IdentificationData'
import {StartGameMessage} from '../messages/StartGameMessage'

/**
 * Для запуска игры требуется отправить сообщение StartGameMessage.
 */
export class StartGameRule extends Rule {
	protected execute(): void {
		this.context.messageEmitter.once(StartGameMessage, () => {
			const dataStorageFacade = new DataStorageFacade(this.context.dataStorage)
			const ballEntity = (
				dataStorageFacade
					.createEntityCollection(IdentificationData)
					.find(byType('Ball'))
			)
			if (ballEntity) {
				const ballStateData = ballEntity.find(isData(BallStateData))
				const ballBody = ballEntity.find(isData(RigidbodyData))?.body
				if (ballStateData && ballBody) {
					dataStorageFacade.createDataFasade(ballStateData).replace(new BallStateData(BallStateType.Moving))
					ballBody.applyForceToCenter(
						new Vec2(
							0,
							2500 * ballBody.getMass()
						)
					)
				}
			}
		})
	}
}