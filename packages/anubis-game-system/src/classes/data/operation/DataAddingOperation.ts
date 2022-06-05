import {IEntity} from '../../../interfaces/IEntity'
import {IData} from '../../../interfaces/IData'
import {MessageEmitter} from '../../message/MessageEmitter'
import {EntitySymbol} from '../../entity/EntitySymbol'
import {DataAddingMessage} from '../../../messages/DataAddingMessage'

/**
 * Операция для добавления данных в игровую сущность.
 * @event DataAddingMessage После добавлении данных генерируется сообщение об этом.
 */
export class DataAddingOperation {
	public constructor(
		/**
		 * Игровая сущность, куда следует добавлять новые данные.
		 */
		private readonly entity: IEntity,
		/**
		 * Ссылка на массив игровых данных.
		 */
		private readonly entityDataList: IData[],
		/**
		 * Ссылка на шировещательные сообщения.
		 */
		private readonly messageEmitter: MessageEmitter
	) {}

	/**
	 * Выполнить добавление игровых данных в заданную сущность.
	 * @param dataList Список игровых данных.
	 */
	public execute(...dataList: IData[]) {
		for (const data of dataList) {
			Reflect.set(data, EntitySymbol, this.entity)
			this.entityDataList.push(data)
			this.messageEmitter.emit(new DataAddingMessage(data))
		}
	}
}