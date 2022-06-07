import {IMessageBroker} from 'anubis-message-broker'
import {IEntity} from '../../interfaces/IEntity'
import {IData} from '../../interfaces/IData'
import {DataAddingOperation} from './DataAddingOperation'
import {DataDeletingOperation} from './DataDeletingOperation'
import {DataReplacingMessage} from '../../messages/DataReplacingMessage'

export class DataReplacingOperation {
	public constructor(
		private readonly messageBroker: IMessageBroker,
		private readonly parentEntity: IEntity
	) {}

	public replace(previousData: IData, data: IData) {
		new DataDeletingOperation(this.messageBroker, this.parentEntity).delete(previousData)
		new DataAddingOperation(this.messageBroker, this.parentEntity).add(data)
		this.messageBroker.emit(new DataReplacingMessage(previousData, data))
	}
}