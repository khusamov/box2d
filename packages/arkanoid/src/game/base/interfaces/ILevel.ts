import {IRule} from './IRule';
import {IGameEnvironment} from './IGameEnvironment';
import {IGameLifeCycle} from './IGameLifeCycle';

/**
 * Уровень это набор определенных правил игры и метод для инициализации игры.
 */
export interface ILevel {
	/**
	 * Набор правил для данного уровня.
	 */
	readonly ruleList: IRule[]

	/**
	 * Инициализация игры для данного уровня.
	 * @param game
	 */
	init(game: IGameEnvironment & IGameLifeCycle): void
}