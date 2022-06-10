import {ICommand, IDisposable, IStartable, IStoppable} from 'base-types'
import {TMessageConstructor} from '../types/TMessageConstructor'
import {TMessageListener} from '../types/TMessageListener'
import {IMessage} from '../interfaces/IMessage'
import {IMessageBroker} from '../interfaces/IMessageBroker'
import {IMessageEmitter} from '../interfaces/IMessageEmitter'
import {MessageEmitCommand} from './MessageEmitCommand'
import {EventEmitter} from 'events'
import {MessageEmitter} from './MessageEmitter'
import {IMessageEmitCommand} from '../interfaces/IMessageEmitCommand'

interface IMessageBrokerParameters {
	commandQueue: ICommand[]
	messageQueue?: IMessage[]
	messageEmitter?: IMessageEmitter
	messageEmitCommand?: IMessageEmitCommand
}

/**
 * Порядок работы с брокером сообщений.
 * Отправка сообщения:
 * - MessageBroker.emit() - Размещение сообщения в очереди сообщений.
 * - MessageEmitCommand - Извлекает сообщение из очереди сообщений и отправляет в MessageEmitter.
 * - MessageEmitter - Вызывает слушателей данного класса сообщений.
 * Подписка на сообщения:
 * - MessageBroker.on() или .once() - Подписка на класс сообщений.
 */
export class MessageBroker implements IMessageBroker, IStartable, IStoppable {
	private readonly commandQueue: ICommand[]
	private readonly messageQueue: IMessage[]
	private readonly messageEmitter: IMessageEmitter
	private readonly messageEmitCommand: IMessageEmitCommand

	public constructor(commandQueue: ICommand[])
	public constructor(parameters: IMessageBrokerParameters)
	public constructor(commandQueueOrParameters: ICommand[] | IMessageBrokerParameters) {
		const parameters: IMessageBrokerParameters = (
			Array.isArray(commandQueueOrParameters)
				? {commandQueue: commandQueueOrParameters}
				: commandQueueOrParameters
		)
		this.commandQueue = parameters.commandQueue
		this.messageQueue = parameters.messageQueue ? parameters.messageQueue : []
		this.messageEmitter = (
			parameters.messageEmitter
				? parameters.messageEmitter
				: new MessageEmitter(new EventEmitter)
		)
		this.messageEmitCommand = (
			parameters.messageEmitCommand
				? parameters.messageEmitCommand
				: new MessageEmitCommand(this.messageEmitter, this.messageQueue, this.commandQueue)
		)
	}

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

	public stop() {
		this.messageEmitCommand.stop()
	}
}