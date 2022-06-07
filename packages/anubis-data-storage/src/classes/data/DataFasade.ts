import {IMessageBroker} from 'anubis-message-broker'
import {IData} from '../../interfaces/IData'
import {DataDeletingOperation} from './DataDeletingOperation'
import {DataReplacingOperation} from './DataReplacingOperation'
import {parentNodeSymbol} from '../../interfaces/INode'

export class DataFasade {
	private readonly dataDeletingOperation: DataDeletingOperation
	private readonly dataReplacingOperation: DataReplacingOperation

	public constructor(
		private readonly messageBroker: IMessageBroker,
		private readonly data: IData
	) {
		const parentEntity = data[parentNodeSymbol]
		if (!parentEntity) {
			throw new Error('Не определена сущность')
		}
		this.dataDeletingOperation = new DataDeletingOperation(
			this.messageBroker,
			parentEntity
		)
		this.dataReplacingOperation = new DataReplacingOperation(
			this.messageBroker,
			parentEntity
		)
	}

	public delete() {
		this.dataDeletingOperation.delete(this.data)
		return this
	}

	public replaceData(data: IData) {
		this.dataReplacingOperation.replace(this.data, data)
		return this
	}
}