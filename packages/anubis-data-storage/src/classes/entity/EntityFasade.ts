import {IEntity} from '../../interfaces/IEntity'
import {DataAddingOperation} from '../data/DataAddingOperation'
import {IMessageEmitter} from 'anubis-message-broker'
import {IData} from '../../interfaces/IData'
import {DataReplacingOperation} from '../data/DataReplacingOperation'
import {DataDeletingOperation} from '../data/DataDeletingOperation'

export class EntityFasade {
	private readonly dataAddingOperation: DataAddingOperation
	private readonly dataDeletingOperation: DataDeletingOperation
	private readonly dataReplacingOperation: DataReplacingOperation

	public constructor(
		private readonly messageEmitter: IMessageEmitter,
		private readonly parentEntity: IEntity
	) {
		this.dataAddingOperation = new DataAddingOperation(
			this.messageEmitter,
			this.parentEntity
		)
		this.dataDeletingOperation = new DataDeletingOperation(
			this.messageEmitter,
			this.parentEntity
		)
		this.dataReplacingOperation = new DataReplacingOperation(
			this.messageEmitter,
			this.parentEntity
		)
	}

	public addData(...datas: IData[]) {
		this.dataAddingOperation.add(...datas)
		return this
	}

	public deleteData(...datas: IData[]) {
		this.dataDeletingOperation.delete(...datas)
		return this
	}

	public deleteAllData(recursive?: boolean) {
		this.dataDeletingOperation.deleteAll(recursive)
		return this
	}

	public replaceData(previousData: IData, data: IData) {
		this.dataReplacingOperation.replace(previousData, data)
		return this
	}
}