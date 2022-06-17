import {IEntity} from '../../interfaces/IEntity'
import {DataAddingOperation} from '../data/DataAddingOperation'
import {IMessageEmitter} from 'anubis-message-broker'
import {IData} from '../../interfaces/IData'
import {DataReplacingOperation} from '../data/DataReplacingOperation'
import {DataDeletingOperation} from '../data/DataDeletingOperation'
import {parentNodeSymbol} from '../../interfaces/INode'
import {IRoot} from '../../interfaces/IRoot'

export class EntityFasade {
	private readonly dataAddingOperation: DataAddingOperation
	private readonly dataDeletingOperation: DataDeletingOperation
	private readonly dataReplacingOperation: DataReplacingOperation

	public constructor(
		private readonly messageEmitter: IMessageEmitter,
		private readonly entity: IEntity
	) {
		this.dataAddingOperation = new DataAddingOperation(
			this.messageEmitter,
			this.entity
		)
		this.dataDeletingOperation = new DataDeletingOperation(
			this.messageEmitter,
			this.entity
		)
		this.dataReplacingOperation = new DataReplacingOperation(
			this.messageEmitter,
			this.entity
		)
	}

	public get parentEntity(): IEntity | IRoot {
		if (!this.entity[parentNodeSymbol]) {
			throw new Error('Не определена родительская сущность')
		}
		return this.entity[parentNodeSymbol]
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