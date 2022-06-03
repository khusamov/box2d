import {IEntity} from '../interfaces/IEntity'
import {IData} from '../interfaces/IData'
import {MessageEmitter} from './MessageEmitter'
import {EntitySymbol} from './EntitySymbol'
import {DataAddingMessage} from '../messages/DataAddingMessage'

/**
 * @event DataAddingMessage
 */
export class DataAddingOperation {
	public constructor(
		private readonly entity: IEntity,
		private readonly entityDataList: IData[],
		private readonly messageEmitter: MessageEmitter
	) {}

	public execute(...dataList: IData[]) {
		for (const data of dataList) {
			Reflect.set(data, EntitySymbol, this.entity)
			this.entityDataList.push(data)
			this.messageEmitter.emit(new DataAddingMessage(data))
		}
	}
}