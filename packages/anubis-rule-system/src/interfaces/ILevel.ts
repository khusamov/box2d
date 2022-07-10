import {IRule} from './IRule'
import {IRuleContext} from './IRuleContext'

/**
 * Группа правил, объединенных в уровень игры.
 */
export interface ILevel extends IRule {
	/**
	 * Инициализировать все правила данного уровня игры.
	 * @param context Контекст игры со ссылками на объекты IDataStorage и IMessageEmitter.
	 */
	init(context: IRuleContext): void
}