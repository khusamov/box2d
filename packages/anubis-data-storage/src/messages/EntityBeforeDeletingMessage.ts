import {IMessage} from 'anubis-message-broker'
import {IEntity} from '../interfaces/IEntity'

/**
 * Сообщение перед удалением игровой сущности.
 */
export class EntityBeforeDeletingMessage implements IMessage {
	public constructor(public readonly entity: IEntity) {}
}