import {IEntity} from '../interfaces/IEntity'
import {Message} from '../classes/Message'

/**
 * Сообщение о создании игровой сущности.
 *
 * Сообщать о создании пустого массива сущности не имеет смысла, так как сущность без данных это неизвестно что!
 *
 * @deprecated
 */
export class EntityCreationMessage extends Message {
	public constructor(
		public readonly entity: IEntity
	) {
		super()
	}
}