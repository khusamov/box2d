import {IMessage} from '../interfaces/IMessage'
import {IEntity} from '../interfaces/IEntity'

/**
 * Сообщение об удалении сущности тоже не имеет смысла как и EntityCreationMessage.
 * @deprecated
 */
export class EntityDestructionMessage implements IMessage {
	constructor(public readonly entity: IEntity) {}
}