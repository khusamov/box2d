import {IMessageEmitter} from 'anubis-message-broker'
import {IData} from '../../interfaces/IData'
import {DataDeletingOperation} from './DataDeletingOperation'
import {DataReplacingOperation} from './DataReplacingOperation'
import {parentNodeSymbol} from '../../interfaces/INode'
import {IEntity} from '../../interfaces/IEntity'

export class DataFacade {
	private readonly dataDeletingOperation: DataDeletingOperation
	private readonly dataReplacingOperation: DataReplacingOperation

	public constructor(
		private readonly messageEmitter: IMessageEmitter,
		private readonly data: IData
	) {
		this.dataDeletingOperation = new DataDeletingOperation(
			this.messageEmitter,
			this.entity
		)
		this.dataReplacingOperation = new DataReplacingOperation(
			this.messageEmitter,
			this.entity
		)
	}

	public get entity(): IEntity {
		if (!this.data[parentNodeSymbol]) {
			throw new Error('Не определена родительская сущность')
		}
		return this.data[parentNodeSymbol]
	}

	public delete() {
		this.dataDeletingOperation.delete(this.data)
		return this
	}

	public replace(data: IData) {
		this.dataReplacingOperation.replace(this.data, data)
		return this
	}
}