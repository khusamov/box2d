import {World} from 'planck'
import {RigidbodyData} from '../data/RigidbodyData'
import {PhysicWorldData} from '../data/PhysicWorldData'
import {PhysicWorldCreationMessage} from '../messages/PhysicWorldCreationMessage'
import {RigidbodyCreationMessage} from '../messages/RigidbodyCreationMessage'
import {Rule} from 'anubis-rule-system'
import {DataAddingMessage, DataStorageFasade, isData} from 'anubis-data-storage'
import {DisposableArray} from 'base-types'
import {UpdateMessage} from 'anubis-game-system-2'


/**
 * Если создана сущность с данными RigidbodyData, то для нее создается твердое тело для физической симуляции.
 * После этого генерируется событие RigidbodyCreationMessage.
 * Внимание, в userData размещается ссылка на IEntity, содержащий RigidbodyData.
 * @event RigidbodyCreatedMessage
 */
export class RigidbodyCreatorRule extends Rule {
	private messageListenerDisposerArray: DisposableArray = new DisposableArray

	public init(): void {
		this.messageListenerDisposerArray.push(this.messageEmitter.on(DataAddingMessage, this.onDataAddingMessage.bind(this)))
	}

	private onDataAddingMessage({data}: DataAddingMessage) {
		if (data instanceof RigidbodyData) {
			const rigidbodyDataOrder = data

			if (rigidbodyDataOrder.body) {
				throw new Error('Нельзя добавлять данные RigidbodyData с предопределенным body')
			}

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

	public override dispose() {
		super.dispose()
		this.messageListenerDisposerArray.dispose()
	}
}