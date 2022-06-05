import {IEntity} from '../../interfaces/IEntity'
import {IData} from '../../interfaces/IData'
import {DataAddingOperation} from '../data/operation/DataAddingOperation'
import {resolve} from 'inversion-of-control'
import {MessageEmitter} from '../message/MessageEmitter'
import {DataDeletingOperation} from '../data/operation/DataDeletingOperation'
import {DataReplacingOperation} from '../data/operation/DataReplacingOperation'

/**
 * @event DataAddingMessage
 * @event DataDeletingMessage
 */
export class EntityFasade {
	private readonly dataAddingOperation: DataAddingOperation
	private readonly dataDeletingOperation: DataDeletingOperation
	private readonly dataReplacingOperation: DataReplacingOperation

	public constructor(
		private entity: IEntity
	) {
		const entityDataList = resolve<IData[]>('EntityDataList')
		const messageEmitter = resolve<MessageEmitter>('MessageEmitter')
		this.dataAddingOperation = new DataAddingOperation(this.entity, entityDataList, messageEmitter)
		this.dataDeletingOperation = new DataDeletingOperation(this.entity, entityDataList, messageEmitter)
		this.dataReplacingOperation = new DataReplacingOperation(this.entity, entityDataList, messageEmitter)
	}

	public add(...dataList: IData[]) {
		this.dataAddingOperation.execute(...dataList)
		return this
	}

	public delete(...dataList: IData[]) {
		this.dataDeletingOperation.execute(...dataList)
		return this
	}

	public replace<D extends IData>(previousData: D, data: D) {
		this.dataReplacingOperation.execute<D>(previousData, data)
		return this
	}
}