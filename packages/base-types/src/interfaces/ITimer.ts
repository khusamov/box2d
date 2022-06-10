import {IStartable} from './IStartable'
import {IStoppable} from './IStoppable'

export interface ITimer extends IStartable, IStoppable {
	/**
	 * Количество миллисекунд с начала старта таймера.
	 * С учетом всех пауз.
	 */
	readonly interval: number

	/**
	 * Общее время остановки таймера.
	 * В миллисекундах.
	 */
	readonly pauseInterval: number

	toggle(): void
	pause(): void
}