import {DataStorageFacade, IEntity, isData} from 'anubis-data-storage'
import {DeletedMarkData} from 'anubis-deletion-system'
import {ContactFacade, PhysicWorldData, PhysicWorldRuleHelper} from 'anubis-physic-system'
import {Rule} from 'anubis-rule-system'
import {Contact} from 'planck'
import {byType, IdentificationData} from '../data/IdentificationData'
import {BrickBallCollisionMessage} from '../messages/BrickBallCollisionMessage'

type TContactListener = (contact: Contact) => void
const contactEventType = 'end-contact'

/**
 * Правило разрешения столкновения мячика и кирпичика.
 * @event BrickBallCollisionMessage
 */
export class BrickBallCollisionRule extends Rule {
	private contactListener: TContactListener | undefined

	protected async execute() {
		const world = await new PhysicWorldRuleHelper(this.context).getWorld()
		this.contactListener = this.resolveBrickBallCollision.bind(this)
		world.on(contactEventType, this.contactListener)
	}

	private resolveBrickBallCollision(contact: Contact) {
		const contactFacade = new ContactFacade(contact, IdentificationData)
		if (contactFacade.hasIdentification) {
			if (contactFacade.isCollided(byType('Ball'), byType('Brick'))) {
				const brickEntity = contactFacade.find(byType('Brick'))
				if (brickEntity) {
					this.deleteBrickEntity(brickEntity)
				}
			}
		}
	}

	private deleteBrickEntity(brickEntity: IEntity) {
		new DataStorageFacade(this.context.dataStorage).createEntityFasade(brickEntity).addData(new DeletedMarkData)
		this.context.messageEmitter.emit(new BrickBallCollisionMessage(brickEntity))
	}

	public override dispose(): void {
		super.dispose()
		const world = new DataStorageFacade(this.context.dataStorage).find(isData(PhysicWorldData))?.world
		if (world && this.contactListener) {
			world.off(contactEventType, this.contactListener)
		}
	}
}