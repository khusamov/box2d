import {IDisposable} from 'base-types'
import {TMessageConstructor} from '../types/TMessageConstructor'
import {TMessageListener} from '../types/TMessageListener'
import {IMessage} from '../interfaces/IMessage'
import {IMessageEmitter} from '../interfaces/IMessageEmitter'
import {IEventEmitter} from '../interfaces/IEventEmitter'

/**
 * Замена штатного EventEmitter.
 * В качестве ключа используется не строка, а имя класса экземпляра сообщения.
 * Позволяет создать классы сообщений.
 * Для группировки сообщений используйте наследование классов сообщений.
 */
export class MessageEmitter implements IMessageEmitter {
	public constructor(
		private eventEmitter: IEventEmitter
	) {}

	public on<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>): IDisposable {
		return this.addListener('on', MessageClass, listener)
	}

	public once<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>): IDisposable {
		return this.addListener('once', MessageClass, listener)
	}

	public emit(message: IMessage) {
		this.eventEmitter.emit(message.constructor.name, message)
	}

	protected addListener<M extends IMessage>(method: 'on' | 'once', MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>): IDisposable {
		this.eventEmitter[method](MessageClass.name, listener)
		return {
			dispose: () => {
				this.eventEmitter.off(MessageClass.name, listener)
			}
		}
	}
}