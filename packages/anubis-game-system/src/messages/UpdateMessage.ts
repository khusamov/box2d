import {Message} from 'anubis-message-broker'
import {IDataStorage} from 'anubis-data-storage'

/**
 * Обновление игровой логики.
 * Генерируется с фиксированным временным интервалом для вычисления физики и т.п.
 */
export class UpdateMessage extends Message {
	public constructor(
		/**
		 * Временной интервал. Прошедшее время от предыдущего сообщения.
		 * Миллисекунды.
		 */
		public readonly timeInterval: number,
		/**
		 * Состояние игры.
		 */
		public readonly dataStorage: IDataStorage
	) {
		super()
	}
}