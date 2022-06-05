import {IMessage} from '../../anubis-game-system/interfaces/IMessage'

/**
 * Обновление игровой логики.
 * Генерируется с фиксированным временным интервалом для вычисления физики и т.п.
 */
export class UpdateMessage implements IMessage {
	constructor(
		/**
		 * Временной интервал. Прошедшее время от предыдущего сообщения.
		 * Миллисекунды.
		 */
		public timeInterval: number
	) {}
}