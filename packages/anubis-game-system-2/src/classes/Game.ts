import {ITimer} from 'base-types'
import {IMessageEmitter} from 'anubis-message-broker'
import {IGame} from '../interfaces/IGame'
import {IDataStorage} from 'anubis-data-storage'
import {UpdateMessage} from '../messages/UpdateMessage'
import {ILevel, MacroRule} from 'anubis-rule-system'

/**
 * Инициализировать брокер сообщения нужно до создания экземпляра Game.
 * Запуск, пауза и останов игры следует производить при помощи таймера:
 * Game.timer.start(), Game.timer.pause(), Game.timer.stop() и Game.timer.toggle().
 *
 * Управление игрой осуществляется через брокер сообщения. Например:
 * - Сообщение UpdateMessage для вычисления следующего кадра анимации.
 * - Сообщения вида *OrderMessage для управления персонажами игры.
 *
 * Отрисовка кадра анимации осуществляется через состояние игры. Состояние игры подается на вход Level.
 */
export class Game extends MacroRule implements IGame {
	public constructor(
		level: ILevel,
		messageEmitter: IMessageEmitter,
		private readonly timer: ITimer,
		public readonly dataStorage: IDataStorage,
	) {
		super(level)
		this.messageEmitter = messageEmitter
	}

	public start() {
		this.timer.start()
	}

	public stop() {
		this.timer.stop()
	}

	public pause() {
		this.timer.pause()
	}

	public update(timeInterval: number) {
		this.messageEmitter.emit(new UpdateMessage(timeInterval, this.dataStorage))
	}
}