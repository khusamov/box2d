import {IMessage} from 'anubis-message-broker'
import {IEntity} from '../interfaces/IEntity'

/**
 * Сообщение после удаления игровой сущности.
 */
export class EntityAfterDeletingMessage implements IMessage {
	public constructor(public readonly entity: IEntity) {}
}