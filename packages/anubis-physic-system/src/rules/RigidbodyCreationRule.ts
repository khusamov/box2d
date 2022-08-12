import {DataStorageFacade, EntityAfterAddingMessage, isData} from 'anubis-data-storage'
import {Rule} from 'anubis-rule-system'
import {World} from 'planck'
import {PhysicWorldData} from '../data/PhysicWorldData'
import {RigidbodyData} from '../data/RigidbodyData'
import {PhysicWorldCreationMessage} from '../messages/PhysicWorldCreationMessage'
import {RigidbodyCreationMessage} from '../messages/RigidbodyCreationMessage'

/**
 * Если создана сущность с данными RigidbodyData, то для нее создается твердое тело для физической симуляции.
 * После этого генерируется событие RigidbodyCreationMessage.
 * Внимание, в userData размещается ссылка на IEntity, содержащий RigidbodyData.
 * @event RigidbodyCreatedMessage
 */
export class RigidbodyCreationRule extends Rule {
	protected execute(): void {
		this.context.messageEmitter.on(EntityAfterAddingMessage, this.onEntityAfterAddingMessage.bind(this))
	}

	private onEntityAfterAddingMessage({entity}: EntityAfterAddingMessage) {
		const rigidbodyDataOrder = entity.find(isData(RigidbodyData))
		if (rigidbodyDataOrder) {
			if (rigidbodyDataOrder.body) {
				throw new Error('Нельзя добавлять данные RigidbodyData с предопределенным body')
			}

			this.createBody(rigidbodyDataOrder)
		}
	}

	private createBody(rigidbodyDataOrder: RigidbodyData) {
		const dataStorageFacade = new DataStorageFacade(this.context.dataStorage)
		const world = dataStorageFacade.find(isData(PhysicWorldData))?.world

		const createBody = (
			(world: World) => {
				const body = world.createBody(rigidbodyDataOrder.bodyDef)
				const rigidbodyData = new RigidbodyData(rigidbodyDataOrder.bodyDef, body)
				body.setUserData(dataStorageFacade.createDataFasade(rigidbodyDataOrder).entity)
				dataStorageFacade.createDataFasade(rigidbodyDataOrder).replace(rigidbodyData)
				this.context.messageEmitter.emit(new RigidbodyCreationMessage(rigidbodyData))
			}
		)

		if (world) {
			createBody(world)
		} else {
			this.context.messageEmitter.once(PhysicWorldCreationMessage, ({world}) => createBody(world))
		}
	}
}