import {BatMoveMessage} from '../messages/BatMoveMessage'
import {IdentificationData} from '../data/IdentificationData'
import {Vec2} from 'planck'
import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from 'anubis-game-system-2'
import {DataStorageFasade, isData} from 'anubis-data-storage'
import {RigidbodyData} from 'anubis-physic-system'

/**
 * Бита должна всегда следовать за положением курсора мышки.
 */
export class BatMovingRule extends Rule {
	public init(): void {
		this.messageEmitter.on(BatMoveMessage, ({movementX}) => {
			this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
				const batEntity = (
					new DataStorageFasade(dataStorage)
						.createEntityCollection(IdentificationData)
						.find(({type}) => type === 'Bat')
				)
				if (batEntity) {
					const body = batEntity.find(isData(RigidbodyData))?.body
					if (body) {
						body.setPosition(
							new Vec2(
								body.getPosition().x + movementX,
								body.getPosition().y
							)
						)
					}
				}
			})
		})
	}
}