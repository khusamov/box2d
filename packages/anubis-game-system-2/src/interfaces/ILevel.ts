import {IMessage} from 'anubis-message-broker'
import {IRule} from './IRule'

export interface ILevel extends IRule {
	/**
	 * Сообщения уровня, которые инициализируют игру в начале.
	 */
	readonly messages?: IMessage[]

	/**
	 * Запустить все правила данного уровня игры.
	 */
	execute(): void
}