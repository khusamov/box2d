import {IMessage} from '../interfaces/IMessage'
import {IEntity} from '../interfaces/IEntity'

/**
 * Сообщение о создании игровой сущности.
 */
export class EntityCreationMessage implements IMessage {
	public constructor(
		public readonly entity: IEntity
	) {}
}