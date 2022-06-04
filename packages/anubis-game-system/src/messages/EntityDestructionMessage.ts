import {IEntity} from '../interfaces/IEntity'
import {Message} from '../classes/Message'

/**
 * Сообщение об удалении сущности тоже не имеет смысла как и EntityCreationMessage.
 * @deprecated
 */
export class EntityDestructionMessage extends Message {
	constructor(public readonly entity: IEntity) {
		super()
	}
}