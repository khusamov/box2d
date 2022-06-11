import {IDisposable, IStartable, IStoppable} from 'base-types'

export interface IGame extends IDisposable, IStartable, IStoppable {
	/**
	 * Отложенная инициализация игры.
	 */
	init(): void

	/**
	 * Освобождение ресурсов, которые были заняты правилами игры.
	 * В основном это удаление слушателей сообщений.
	 */
	dispose(): void

	pause(): void
}