import {IMessageEmitter} from 'anubis-message-broker'
import {IEntity} from '../../interfaces/IEntity'
import {parentNodeSymbol} from '../../interfaces/INode'
import {EntityBeforeDeletingMessage} from '../../messages/EntityBeforeDeletingMessage'
import {EntityAfterDeletingMessage} from '../../messages/EntityAfterDeletingMessage'

/**
 * Удаление сущности со всеми ее данными.
 * @event EntityBeforeDeletingMessage
 * @event EntityAfterDeletingMessage
 */
export class EntityDeletingOperation {
	public constructor(
		private readonly messageEmitter: IMessageEmitter
	) {}

	public delete(...entities: IEntity[]) {
		for (const entity of entities) {
			const parentNode = entity[parentNodeSymbol]

			if (!parentNode) {
				throw new Error('Не найден родительский узел')
			}

			this.messageEmitter.emit(new EntityBeforeDeletingMessage(entity))

			// Удалить сущность.
			parentNode.splice(parentNode.indexOf(entity), 1)

			this.messageEmitter.emit(new EntityAfterDeletingMessage(entity))
		}
	}
}