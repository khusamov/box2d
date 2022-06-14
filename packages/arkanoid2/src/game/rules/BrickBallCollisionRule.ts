import {Rule} from 'anubis-rule-system'
import {ContactFasade, PhysicWorldCreationMessage} from 'anubis-physic-system'
import {DataStorageFasade, IEntity} from 'anubis-data-storage'
import {IdentificationData} from '../data/IdentificationData'
import {DeletedMarkData, UpdateMessage} from 'anubis-game-system-2'
import {Contact} from 'planck'

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
		})
	}
}

