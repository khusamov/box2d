import {IData} from '../interfaces/IData'
import {IEntity} from '../interfaces/IEntity'
import {IMessage} from '../interfaces/IMessage'

/**
 * Сообщение об удалении данных из сущности.
 */
export class DataDeletingMessage implements IMessage {
	public constructor(
		/**
		 * Удаляемые данные.
		 */
		public readonly data: IData,
		/**
		 * Сущность, из которой данные были удалены.
		 */
		public readonly entity: IEntity
	) {}
}