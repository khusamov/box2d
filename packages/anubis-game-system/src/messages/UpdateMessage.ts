import {Message} from 'anubis-message-broker'

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
		public readonly timeInterval: number
	) {
		super()
	}
}