import {IEntity} from '../interfaces/IEntity'
import {IData} from '../interfaces/IData'
import {MessageEmitter} from './MessageEmitter'
import {EntitySymbol} from './EntitySymbol'
import {DataDeletingMessage} from '../messages/DataDeletingMessage'
import {DataNotFoundError} from '../errors/DataNotFoundError'

/**
 * @event DataDeletingMessage
 * @exception DataNotFoundError
 */
export class DataDeletingOperation {
	public constructor(
		private readonly entity: IEntity,
		private readonly entityDataList: IData[],
		private readonly messageEmitter: MessageEmitter
	) {}

	public execute(...dataList: IData[]) {
		for (const data of dataList) {
			if (Reflect.get(data, EntitySymbol) !== this.entity) {
				throw new DataNotFoundError(data, this.entity)
			}

			Reflect.set(data, EntitySymbol, undefined)
			this.entityDataList.splice(this.entityDataList.indexOf(data), 1)
			this.messageEmitter.emit(new DataDeletingMessage(data, this.entity))
		}
	}
}