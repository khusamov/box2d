import {IEntity} from '../../interfaces/IEntity'
import {IData} from '../../interfaces/IData'
import {setParent} from '../../functions/setParent'
import {DataAfterAddingMessage} from '../../messages/DataAfterAddingMessage'
import {IMessageEmitter} from 'anubis-message-broker'

/**
 * Добавление данных в сущность.
 * @event DataAfterAddingMessage
 */
export class DataAddingOperation {
	public constructor(
		private readonly messageEmitter: IMessageEmitter,
		private readonly parentEntity: IEntity
	) {}

	public add(...datas: IData[]) {
		// Связать все вложенные узлы.
		setParent(this.parentEntity, ...datas)

		// Добавить данные в родительскую сущность.
		this.parentEntity.push(...datas)

		// Передать сообщения о добавлении игровых данных.
		for (const data of datas) {
			this.messageEmitter.emit(new DataAfterAddingMessage(data))
		}
	}
}