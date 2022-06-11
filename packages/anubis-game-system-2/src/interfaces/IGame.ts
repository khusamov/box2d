import {IDisposable} from 'base-types'

export interface IGame extends IDisposable {
	/**
	 * Отложенная инициализация игры.
	 */
	init(): void

	/**
	 * Освобождение ресурсов, которые были заняты правилами игры.
	 * В основном это удаление слушателей сообщений.
	 */
	dispose(): void
}