import {IEntity} from '../../interfaces/IEntity'
import {INode} from '../../interfaces/INode'
import {IData} from '../../interfaces/IData'
import {DataAddingMessage} from '../../messages/DataAddingMessage'
import {setParent} from '../../functions/setParent'
import {IRoot} from '../../interfaces/IRoot'
import {IMessageEmitter} from 'anubis-message-broker'

const isData = (node: INode): node is IData => !Array.isArray(node)

/**
 * Добавление сущностей в корень хранилища или в другую сущность.
 * @event DataAddingMessage
 */
export class EntityAddingOperation {
	public constructor(
		private readonly messageEmitter: IMessageEmitter,
		private readonly parentNode: IRoot | IEntity
	) {}

	public add(...entities: IEntity[]) {
		setParent(this.parentNode, ...entities)

		this.parentNode.push(...entities)

		for (const data of entities.flat(Infinity).filter(isData)) {
			this.messageEmitter.emit(new DataAddingMessage(data))
		}
	}
}