import {ITimerLifecycle} from './ITimerLifecycle'

export interface ITimer extends ITimerLifecycle {
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
}