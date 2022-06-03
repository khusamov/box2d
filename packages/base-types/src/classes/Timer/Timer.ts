import {IStartable, IStoppable} from '../../interfaces';
import {ETimerState, TTimerAction} from './timerTypes';
import {handleByState} from './handleByState';

/**
 * Простая реализация таймера.
 */
export class Timer implements IStartable, IStoppable {
	private timerId: number | undefined

	/**
	 * Время запуска таймера. В миллисекундах.
	 * @private
	 */
	private time: number = 0

	/**
	 * Время постановки на паузу. В миллисекундах.
	 * @private
	 */
	private pauseTime: number = 0

	/**
	 * Общее время остановки таймера. В миллисекундах.
	 * @private
	 */
	private _pauseInterval: number = 0

	public get pauseInterval(): number {
		return this._pauseInterval
	}

	/**
	 * Текущее состояние таймера
	 * @private
	 */
	private state: ETimerState = ETimerState.Stopped

	/**
	 * Внимание, внутри action определена this как Timer.
	 * @param timeout
	 * @param action
	 */
	constructor(
		private timeout: number,
		private action: TTimerAction
	) {}

	/**
	 * Запуск таймера.
	 * Стартовать таймер сначала или продолжить с паузы.
	 */
	public start() {
		handleByState(this.state, {
			paused: () => {
				this.state = ETimerState.Started
				this._pauseInterval += Date.now() - this.pauseTime
			},
			stopped: () => {
				this.state = ETimerState.Started
				this.timerId = window.setInterval(this.tick.bind(this), this.timeout)
				this.time = Date.now()
			}
		})
	}

	/**
	 * Поставить на паузу таймер.
	 * Состояние сохраняется, счет приостанавливается.
	 */
	public pause() {
		handleByState(this.state, {
			started: () => {
				this.state = ETimerState.Paused
				this.pauseTime = Date.now()
			}
		})
	}

	/**
	 * Остановить таймер.
	 * Полный сброс таймера.
	 */
	public stop() {
		const stop = () => {
			this.state = ETimerState.Stopped
			clearInterval(this.timerId)
			this.timerId = undefined
			this.time = 0
		}
		handleByState(this.state, {
			started: stop,
			paused: stop
		})
	}

	/**
	 * Изменить состояние таймера на обратное.
	 * Запустить, если остановлен.
	 * Или поставить на паузу, если запущен.
	 */
	public toggle() {
		handleByState(this.state, {
			started: this.pause.bind(this),
			stopped: this.start.bind(this)
		})
	}

	/**
	 * Количество миллисекунд с начала старта таймера.
	 * С учетом всех пауз.
	 */
	public get interval(): number {
		const result = handleByState(this.state, {
			started: () => Date.now() - this.time - this.pauseTime,
			paused: () => this.time - this.pauseTime,
			stopped: () => 0
		})
		return result === undefined ? 0 : result
	}

	/**
	 * Выполняемая нагрузка таймера.
	 * @private
	 */
	private tick() {
		handleByState(this.state, {
			started: () => this.action.call(this)
		})
	}
}