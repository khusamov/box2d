import {BatMoveMessage} from '../messages/BatMoveMessage'
import {byType, IdentificationData} from '../data/IdentificationData'
import {Vec2} from 'planck'
import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from 'anubis-game-system'
import {DataStorageFasade, isData} from 'anubis-data-storage'
import {RigidbodyData} from 'anubis-physic-system'

/**
 * Правило движения биты: жесткое следование за курсором мышки.
 */
export class BatHardMovingRule extends Rule {
	public init(): void {
		this.messageEmitter.on(BatMoveMessage, ({movementX}) => {
			this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
				const batEntity = (
					new DataStorageFasade(dataStorage)
						.createEntityCollection(IdentificationData)
						.find(byType('Bat'))
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