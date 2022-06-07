import {IEntity} from '../../interfaces/IEntity'
import {IData} from '../../interfaces/IData'
import {setParent} from '../../functions/setParent'
import {DataAddingMessage} from '../../messages/DataAddingMessage'
import {IMessageBroker} from 'anubis-message-broker'

/**
 * Добавление данных в сущность.
 * @event DataAddingMessage
 */
export class DataAddingOperation {
	public constructor(
		private readonly messageBroker: IMessageBroker,
		private readonly parentEntity: IEntity
	) {}

	public add(...datas: IData[]) {
		setParent(datas, this.parentEntity)

		this.parentEntity.push(...datas)

		for (const data of datas) {
			this.messageBroker.emit(new DataAddingMessage(data))
		}
	}
}