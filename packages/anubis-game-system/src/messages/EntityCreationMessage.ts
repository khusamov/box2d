import {IMessage} from '../interfaces/IMessage'
import {IEntity} from '../interfaces/IEntity'

/**
 * Сообщение о создании игровой сущности.
 *
 * Сообщать о создании пустого массива сущности не имеет смысла, так как сущность без данных это неизвестно что!
 *
 * @deprecated
 */
export class EntityCreationMessage implements IMessage {
	public constructor(
		public readonly entity: IEntity
	) {}
}