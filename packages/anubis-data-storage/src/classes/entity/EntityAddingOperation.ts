import {IEntity} from '../../interfaces/IEntity'
import {setParent} from '../../functions/setParent'
import {IRoot} from '../../interfaces/IRoot'
import {IMessageEmitter} from 'anubis-message-broker'
import {EntityAfterAddingMessage} from '../../messages/EntityAfterAddingMessage'

/**
 * Добавление сущностей в корень хранилища или в другую сущность.
 * @event EntityAfterAddingMessage
 */
export class EntityAddingOperation {
	public constructor(
		private readonly messageEmitter: IMessageEmitter,
		private readonly parentNode: IRoot | IEntity
	) {}

	public add(...entities: IEntity[]) {
		// Связать все вложенные узлы.
		setParent(this.parentNode, ...entities)

		// Добавить сущности в родительский узел.
		this.parentNode.push(...entities)

		// Передать сообщения о добавлении игровой сущности.
		for (const entity of entities) {
			this.messageEmitter.emit(new EntityAfterAddingMessage(entity))
		}
	}
}