import {IDisposable} from 'base-types'
import {TMessageConstructor} from '../types/TMessageConstructor'
import {TMessageListenerContext, TMessageListener} from '../types/TMessageListener'
import {IMessage} from '../interfaces/IMessage'
import {IMessageEmitter} from '../interfaces/IMessageEmitter'
import {IEventEmitter} from '../interfaces/IEventEmitter'
import {MessageListenerDisposer} from './MessageListenerDisposer'

/**
 * Замена штатного EventEmitter.
 * В качестве ключа используется не строка, а имя класса экземпляра сообщения.
 * Позволяет создать классы сообщений.
 * Для группировки сообщений используйте наследование классов сообщений.
 */
export class MessageEmitter<C extends object = {}> implements IMessageEmitter<C> {
	public constructor(
		private readonly eventEmitter: IEventEmitter,
		private readonly context: C = Object()
	) {}

	public on<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M, C>): IDisposable {
		return this.addListener('on', MessageClass, listener)
	}

	public once<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M, C>): IDisposable {
		return this.addListener('once', MessageClass, listener)
	}

	public emit(message: IMessage) {
		this.eventEmitter.emit(message.constructor.name, message)
	}

	public dispose(): void {
		this.eventEmitter.removeAllListeners()
	}

	private addListener<M extends IMessage>(method: 'on' | 'once', MessageClass: TMessageConstructor<M>, listener: TMessageListener<M, C>): IDisposable {
		const disposer = new MessageListenerDisposer(this.eventEmitter, MessageClass)
		disposer.listener = (message: M) => listener(message, this.createMessageListenerContextContext(disposer))
		this.eventEmitter[method](MessageClass.name, disposer.listener)
		return disposer
	}

	private createMessageListenerContextContext<M extends IMessage>(disposer: MessageListenerDisposer<M>): TMessageListenerContext<C> {
		return Object.assign(
			() => disposer.dispose(),
			{dispose: disposer.dispose},
			this.context
		)
	}
}