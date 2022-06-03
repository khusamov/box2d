import {EventEmitter} from 'events';
import {IStartable, IStoppable} from '../interfaces';

/**
 * http://gs-studio.com/news-about-it/30703----javascript
 * https://eatdog.com.ua/assets/gamedev-slides/
 * https://www.youtube.com/watch?v=-gsjAz9jR3Y
 */
export class GameLoop implements IStartable, IStoppable {
	private readonly eventEmitter = new EventEmitter

	private time: number = 0
	private timeInterval: number = 0

	private renderTime: number = 0
	private renderTimeInterval: number = 0

	/**
	 * Текущий FPS отрисовки игровой сцены.
	 */
	public get renderFramePerSecond(): number {
		return 1 / (this.renderTimeInterval / 1000)
	}

	/**
	 * Временной шаг, с которым вызывается функция update для вычисления игровой логики.
	 * Измеряется в миллисекундах.
	 */
	public get step(): number {
		return (1 / this.framePerSecond) / 1000
	}

	public constructor(
		/**
		 * Частота обновления игровой логики (генерации события update).
		 * @private
		 */
		private readonly framePerSecond = 60 // TODO Переименовать в updatePerSecond?
	) {}

	on(eventName: 'update', update: (step: number) => void): this
	on(eventName: 'render', render: (timeInterval: number) => void): this
	on(eventName: string | number, listener: (...args: any[]) => void): this {
		this.eventEmitter.on(eventName, listener)
		return this
	}

	public start(): void {
		this.time = performance.now()
		this.timeInterval = 0
		requestAnimationFrame(this.frame.bind(this))
	}

	public stop(): void {

	}

	public pause(): void {

	}

	private frame() {
		// Обработка логики игры.
		{
			const currentTime = performance.now()

			// Исправление проблемы неактивных вкладок.
			// Разрешить максимальную задержку между вызовами не более, чем 1 секунда.
			this.timeInterval = this.timeInterval + Math.min(1000, currentTime - this.time)

			while (this.timeInterval > this.step) {
				this.timeInterval = this.timeInterval - this.step
				this.eventEmitter.emit('update', this.step)
			}

			this.time = currentTime
		}

		// Обработка отрисовки сцены игры.
		{
			const renderCurrentTime = performance.now()
			this.renderTimeInterval = renderCurrentTime - this.renderTime
			this.renderTime = renderCurrentTime
			this.eventEmitter.emit('render', this.timeInterval)
		}

		requestAnimationFrame(this.frame.bind(this))
	}
}