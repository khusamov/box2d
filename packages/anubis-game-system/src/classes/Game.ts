import {IMessageEmitter} from 'anubis-message-broker'
import {IGame} from '../interfaces/IGame'
import {IDataStorage} from 'anubis-data-storage'
import {UpdateMessage} from '../messages/UpdateMessage'
import {ILevel, MacroRule} from 'anubis-rule-system'
import {suspendMessageEmitterEmit} from '../const/suspendMessageEmitterEmit'

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
	private readonly sourceMessageEmitter: IMessageEmitter

	public constructor(
		level: ILevel,
		messageEmitter: IMessageEmitter,
		public readonly dataStorage: IDataStorage,
	) {
		super(level)
		this.sourceMessageEmitter = messageEmitter
		this.messageEmitter = this.suspendedMessageEmitter // Изначально игра стоит на паузе.
	}

	public start() {
		this.messageEmitter = this.sourceMessageEmitter
	}

	public stop() {
		this.messageEmitter = this.suspendedMessageEmitter
	}

	public pause() {
		this.messageEmitter = this.suspendedMessageEmitter
	}

	public toggle() {
		this[this.state === 'pause' ? 'start' : 'pause']()
	}

	public update(timeInterval: number) {
		this.messageEmitter.emit(new UpdateMessage(timeInterval, this.dataStorage))
	}

	public override dispose() {
		super.dispose()
		this.messageEmitter.dispose()
	}

	private get state() {
		return this.messageEmitter === this.sourceMessageEmitter ? 'start' : 'pause'
	}

	private get suspendedMessageEmitter() {
		return new Proxy(this.sourceMessageEmitter, suspendMessageEmitterEmit)
	}
}