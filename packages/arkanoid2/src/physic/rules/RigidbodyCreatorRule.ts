import {World} from 'planck'
import {RigidbodyData} from '../data/RigidbodyData'
import {PhysicWorldData} from '../data/PhysicWorldData'
import {PhysicWorldCreationMessage} from '../messages/PhysicWorldCreationMessage'
import {RigidbodyCreationMessage} from '../messages/RigidbodyCreationMessage'
import {DataAddingMessage, DataFasade, isData, Rule} from "anubis-game-system";

/**
 * Если создана сущность с данными RigidbodyData, то для нее создается твердое тело для физической симуляции.
 * После этого генерируется событие RigidbodyCreationMessage.
 * Внимание, в userData размещается ссылка на RigidbodyData.
 * @event RigidbodyCreatedMessage
 */
export class RigidbodyCreatorRule extends Rule {
	public execute(): void {
		this.subscribe.on(DataAddingMessage, ({data}) => {
			if (data instanceof RigidbodyData) {
				const rigidbodyData = data

				if (rigidbodyData.body) {
					throw new Error('Нельзя добавлять данные с определенным body')
				}

				const createBody = (world: World) => {
					const body = world.createBody(rigidbodyData.bodyDef)
					const nextRigidbodyData = new RigidbodyData(rigidbodyData.bodyDef, body)
					body.setUserData(nextRigidbodyData)
					new DataFasade(rigidbodyData).replace(nextRigidbodyData)
					this.emitter.emit(new RigidbodyCreationMessage(nextRigidbodyData))
				}
				
				const world = this.data.find(isData(PhysicWorldData))?.world
				if (world) {
					createBody(world)
				} else {
					this.subscribe.once(PhysicWorldCreationMessage, ({world}) => createBody(world))
				}
			}
		})
	}
}