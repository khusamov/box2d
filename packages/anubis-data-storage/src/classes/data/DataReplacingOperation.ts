import {IMessageEmitter} from 'anubis-message-broker'
import {IEntity} from '../../interfaces/IEntity'
import {IData} from '../../interfaces/IData'
import {DataAddingOperation} from './DataAddingOperation'
import {DataDeletingOperation} from './DataDeletingOperation'
import {DataReplacingMessage} from '../../messages/DataReplacingMessage'

export class DataReplacingOperation {
	public constructor(
		private readonly messageEmitter: IMessageEmitter,
		private readonly parentEntity: IEntity
	) {}

	public replace(previousData: IData, data: IData) {
		new DataDeletingOperation(this.messageEmitter, this.parentEntity).delete(previousData)
		new DataAddingOperation(this.messageEmitter, this.parentEntity).add(data)
		this.messageEmitter.emit(new DataReplacingMessage(previousData, data))
	}
}