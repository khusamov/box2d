import {IRule} from './IRule'

/**
 * Группа правил, объединенных в уровень игры.
 */
export interface ILevel extends IRule {
	/**
	 * Инициализировать все правила данного уровня игры.
	 */
	init(): void
}