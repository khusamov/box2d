import {IMessage} from 'anubis-message-broker'
import {IEntity} from '../interfaces/IEntity'

/**
 * Сообщение после добавления игровой сущности.
 */
export class EntityAfterAddingMessage implements IMessage {
	public constructor(public readonly data: IEntity) {}
}