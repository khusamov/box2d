import {Rule} from '../../anubis-game-system/classes/Rule'
import {BatMoveMessage} from '../messages/BatMoveMessage'
import {isData} from '../../anubis-game-system/functions/isData'
import {Identification} from '../data/Identification'
import {getEntity} from '../../anubis-game-system/functions/getEntity'
import {Rigidbody} from '../data/Rigidbody'
import {Vec2} from 'planck'

/**
 * Бита должна всегда следовать за положением курсора мышки.
 */
export class BatMovingRule extends Rule {
	public execute(): void {
		this.on(BatMoveMessage, message => {
			const identification = (
				this.data
					.filter(isData(Identification))
					.find(identification => identification.type === 'Bat')
			)
			if (identification) {
				const body = getEntity(identification).find(isData(Rigidbody))?.body
				if (body) {
					body.setPosition(
						new Vec2(
							body.getPosition().x + message.movementX,
							body.getPosition().y
						)
					)
				}
			}
		})
	}
}