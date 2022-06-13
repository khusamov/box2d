import {IEntity} from '../../interfaces/IEntity'
import {IData} from '../../interfaces/IData'
import {setParent} from '../../functions/setParent'
import {DataAddingMessage} from '../../messages/DataAddingMessage'
import {IMessageEmitter} from 'anubis-message-broker'

/**
 * Добавление данных в сущность.
 * @event DataAddingMessage
 */
export class DataAddingOperation {
	public constructor(
		private readonly messageEmitter: IMessageEmitter,
		private readonly parentEntity: IEntity
	) {}

	public add(...datas: IData[]) {
		setParent(datas, this.parentEntity)

		this.parentEntity.push(...datas)

		for (const data of datas) {
			this.messageEmitter.emit(new DataAddingMessage(data))
		}
	}
}