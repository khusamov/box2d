import {IEntity} from '../../../interfaces/IEntity'
import {IData} from '../../../interfaces/IData'
import {MessageEmitter} from '../../message/MessageEmitter'
import {DataAddingOperation} from './DataAddingOperation'
import {DataDeletingOperation} from './DataDeletingOperation'
import {DataReplacingMessage} from '../../../messages/DataReplacingMessage'

/**
 * @event DataDeletingMessage
 * @event DataAddingMessage
 * @event DataReplacingMessage
 * @exception DataNotFoundError
 */
export class DataReplacingOperation {
	public constructor(
		private readonly entity: IEntity,
		private readonly entityDataList: IData[],
		private readonly messageEmitter: MessageEmitter
	) {}

	public execute<D extends IData>(previousData: D, data: D) {
		const dataAddingOperation = new DataAddingOperation(this.entity, this.entityDataList, this.messageEmitter)
		const dataDeletingOperation = new DataDeletingOperation(this.entity, this.entityDataList, this.messageEmitter)

		dataDeletingOperation.execute(previousData)
		dataAddingOperation.execute(data)
		this.messageEmitter.emit(new DataReplacingMessage(previousData, data))
	}
}