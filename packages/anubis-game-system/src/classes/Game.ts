import {IMessageEmitter} from 'anubis-message-broker'
import {IGame} from '../interfaces/IGame'
import {IDataStorage} from 'anubis-data-storage'
import {UpdateMessage} from '../messages/UpdateMessage'
import {ILevel, MacroRule} from 'anubis-rule-system'
import {suspendMessageEmitterEmit} from '../const/suspendMessageEmitterEmit'

/**
 * Главный объект игры.
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