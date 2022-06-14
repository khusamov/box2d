import {IMessageEmitter} from 'anubis-message-broker'
import {IEntity} from '../../interfaces/IEntity'
import {IData} from '../../interfaces/IData'
import {DataReplacingMessage} from '../../messages/DataReplacingMessage'
import {setParent} from '../../functions/setParent'

/**
 * @event DataReplacingMessage
 */
export class DataReplacingOperation {
	public constructor(
		private readonly messageEmitter: IMessageEmitter,
		private readonly parentEntity: IEntity
	) {}

	public replace<D extends IData>(previousData: D, data: D) {
		// Удалить предыдущие данные.
		this.parentEntity.splice(this.parentEntity.indexOf(previousData), 1)
		// Добавить новые данные.
		setParent(this.parentEntity, data)
		this.parentEntity.push(data)
		// Отправить сообщение о замене данных.
		this.messageEmitter.emit(new DataReplacingMessage(previousData, data))
	}
}