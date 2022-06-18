import {World} from 'planck'
import {Rule} from 'anubis-rule-system'
import {DataStorageFasade, EntityAfterAddingMessage, isData} from 'anubis-data-storage'
import {UpdateMessage} from 'anubis-game-system-2'
import {RigidbodyData} from '../data/RigidbodyData'
import {PhysicWorldData} from '../data/PhysicWorldData'
import {PhysicWorldCreationMessage} from '../messages/PhysicWorldCreationMessage'
import {RigidbodyCreationMessage} from '../messages/RigidbodyCreationMessage'

/**
 * Если создана сущность с данными RigidbodyData, то для нее создается твердое тело для физической симуляции.
 * После этого генерируется событие RigidbodyCreationMessage.
 * Внимание, в userData размещается ссылка на IEntity, содержащий RigidbodyData.
 * @event RigidbodyCreatedMessage
 */
export class RigidbodyCreatorRule extends Rule {
	public init(): void {
		this.messageEmitter.on(EntityAfterAddingMessage, this.onEntityAfterAddingMessage.bind(this))
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
		this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
			const createBody = (world: World) => {
				const body = world.createBody(rigidbodyDataOrder.bodyDef)
				const rigidbodyData = new RigidbodyData(rigidbodyDataOrder.bodyDef, body)
				body.setUserData(new DataStorageFasade(dataStorage).createDataFasade(rigidbodyDataOrder).entity)
				new DataStorageFasade(dataStorage).createDataFasade(rigidbodyDataOrder).replace(rigidbodyData)
				this.messageEmitter.emit(new RigidbodyCreationMessage(rigidbodyData))
			}

			const world = new DataStorageFasade(dataStorage).find(isData(PhysicWorldData))?.world
			if (world) {
				createBody(world)
			} else {
				this.messageEmitter.once(PhysicWorldCreationMessage, ({world}) => createBody(world))
			}
		})
	}
}