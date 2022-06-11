import {ITimer} from 'base-types'
import {IMessageBroker} from 'anubis-message-broker'
import {ILevel} from '../interfaces/ILevel'
import {IGame} from '../interfaces/IGame'
import {IDataStorage} from 'anubis-data-storage'
import {UpdateMessage} from '../messages/UpdateMessage'

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
export class Game implements IGame {
	public constructor(
		private readonly timer: ITimer,
		private readonly messageBroker: IMessageBroker,
		private readonly dataStorage: IDataStorage,
		private readonly level: ILevel
	) {}

	public init() {
		this.level.execute()
		this.messageBroker.emit(...(this.level.messages || []))
	}

	public dispose() {
		this.level.dispose()
	}

	public start() {
		this.timer.start()
		this.messageBroker.start()
	}

	public stop() {
		this.timer.stop()
		this.messageBroker.stop()
	}

	public pause() {
		this.timer.pause()
		this.messageBroker.pause()
	}

	public update(timeInterval: number) {
		this.messageBroker.emit(new UpdateMessage(timeInterval, this.dataStorage))
	}
}