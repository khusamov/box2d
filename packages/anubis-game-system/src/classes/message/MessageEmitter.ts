import {EventEmitter} from 'events'
import {IDisposable} from 'base-types'
import {IMessage} from '../../interfaces/IMessage'

export type TMessageListener<M extends IMessage> = (message: M) => void
export type TMessageConstructor<M extends IMessage = IMessage> = new(...params: any[]) => M

/**
 * Замена штатного EventEmitter.
 * В качестве ключа используется не строка, а имя класса экземпляра сообщения.
 * Позволяет создать классы сообщений.
 * Для группировки сообщений используйте наследование классов сообщений.
 */
export class MessageEmitter {
	public constructor(private eventEmitter: EventEmitter = new EventEmitter) {}

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