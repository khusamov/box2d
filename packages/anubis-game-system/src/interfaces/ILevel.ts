import {IRule} from './IRule'
import {IMessage} from './IMessage'

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