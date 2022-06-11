import {ICommand, IDisposable} from 'base-types'
import {TMessageConstructor} from '../types/TMessageConstructor'
import {TMessageListener} from '../types/TMessageListener'
import {IMessage} from '../interfaces/IMessage'
import {IMessageBroker} from '../interfaces/IMessageBroker'
import {IMessageEmitter} from '../interfaces/IMessageEmitter'
import {IMessageEmitCommand} from '../interfaces/IMessageEmitCommand'

/**
 * Порядок работы с брокером сообщений.
 * Отправка сообщения:
 * - MessageBroker.emit() - Размещение сообщения в очереди сообщений.
 * - MessageEmitCommand - Извлекает сообщение из очереди сообщений и отправляет в MessageEmitter.
 * - MessageEmitter - Вызывает слушателей данного класса сообщений.
 * Подписка на сообщения:
 * - MessageBroker.on() или .once() - Подписка на класс сообщений.
 */
export class MessageBroker implements IMessageBroker {
	public constructor(
		private readonly commandQueue: ICommand[],
		private readonly messageQueue: IMessage[],
		private readonly messageEmitter: IMessageEmitter,
		private readonly messageEmitCommand: IMessageEmitCommand
	) {}

	public on<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>): IDisposable {
		return this.messageEmitter.on(MessageClass, listener)
	}

	public once<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>): IDisposable {
		return this.messageEmitter.once(MessageClass, listener)
	}

	public emit(...message: IMessage[]): void {
		this.messageQueue.push(...message)
	}

	public start() {
		this.messageEmitCommand.start()
		this.commandQueue.push(this.messageEmitCommand)
	}

	public pause() {
		this.stop()
	}

	public stop() {
		this.messageEmitCommand.stop()
	}
}