import {Rule} from 'anubis-rule-system'
import {ContactFasade, PhysicWorldCreationMessage} from 'anubis-physic-system'
import {DataStorageFasade, IEntity} from 'anubis-data-storage'
import {IdentificationData} from '../data/IdentificationData'
import {UpdateMessage} from 'anubis-game-system'
import {Contact} from 'planck'
import {BrickBallCollisionMessage} from '../messages/BrickBallCollisionMessage'
import {DeletedMarkData} from 'anubis-deletion-system'

export class BrickBallCollisionRule extends Rule {
	public init() {
		this.messageEmitter.once(PhysicWorldCreationMessage, ({world}) => {
			world.on('begin-contact', contact => {
				this.onBeginContact(contact)
			})
		})
	}

	private onBeginContact(contact: Contact) {
		const contactFasade = new ContactFasade(contact, IdentificationData)
		if (contactFasade.hasIdentification) {
			if (contactFasade.isCollided(({type}) => type === 'Ball', ({type}) => type === 'Brick')) {
				const brickEntity = contactFasade.find(({type}) => type === 'Brick')
				if (brickEntity) {
					this.deleteBrickEntity(brickEntity)
				}
			}
		}
	}

	private deleteBrickEntity(brickEntity: IEntity) {
		this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
			new DataStorageFasade(dataStorage).createEntityFasade(brickEntity).addData(new DeletedMarkData)
			this.messageEmitter.emit(new BrickBallCollisionMessage(brickEntity))
		})
	}
}

