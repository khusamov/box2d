import {IStartable, IStoppable} from 'base-types'
import {IRule} from 'anubis-rule-system'

export interface IGame extends IRule, IStartable, IStoppable {
	/**
	 * Инициализировать все правила игры.
	 */
	init(): void

	/**
	 * Освобождение ресурсов, которые были заняты правилами игры.
	 * В основном это удаление слушателей сообщений.
	 */
	dispose(): void

	pause(): void
}