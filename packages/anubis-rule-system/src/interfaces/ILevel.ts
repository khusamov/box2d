import {IRule} from './IRule'

export interface ILevel extends IRule {
	/**
	 * Инициализировать все правила данного уровня игры.
	 */
	init(): void
}