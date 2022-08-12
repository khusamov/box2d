import {DataStorageFacade} from 'anubis-data-storage'
import {BatMoveMessage} from '../messages/BatMoveMessage'
import {byType, IdentificationData} from '../data/IdentificationData'
import {Vec2} from 'planck'
import {Rule} from 'anubis-rule-system'
import {isData} from 'anubis-data-storage'
import {RigidbodyData} from 'anubis-physic-system'

/**
 * Правило движения биты.
 */
export class BatHardMovingRule extends Rule {
	protected execute(): void {
		this.context.messageEmitter.on(BatMoveMessage, ({movementX}) => {
			const batEntity = (
				new DataStorageFacade(this.context.dataStorage)
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
	}
}