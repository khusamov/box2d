import {IData} from '../interfaces/IData'
import {IEntity} from '../interfaces/IEntity'
import {Message} from '../classes/Message'

/**
 * Сообщение об удалении данных из сущности.
 */
export class DataDeletingMessage extends Message {
	public constructor(
		/**
		 * Удаляемые данные.
		 */
		public readonly data: IData,
		/**
		 * Сущность, из которой данные были удалены.
		 */
		public readonly entity: IEntity
	) {
		super()
	}
}