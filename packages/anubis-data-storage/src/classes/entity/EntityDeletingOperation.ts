import {IMessageBroker} from 'anubis-message-broker'
import {IRoot} from '../../interfaces/IRoot'
import {IEntity} from '../../interfaces/IEntity'
import {parentNodeSymbol} from '../../interfaces/INode'
import {DataDeletingOperation} from '../data/DataDeletingOperation'

/**
 * Удаление сущности со всеми ее данными.
 */
export class EntityDeletingOperation {
	public constructor(
		private readonly messageBroker: IMessageBroker
	) {}

	public delete(...entities: IEntity[]) {
		for (const entity of entities) {
			// Удалить все данные (в том числе и вложенные).
			new DataDeletingOperation(this.messageBroker, entity).deleteAll(true)
			// Удалить сущность.
			const parentNode = (entity[parentNodeSymbol] as IEntity | IRoot)
			parentNode.splice(parentNode.indexOf(entity), 1)
		}
	}
}