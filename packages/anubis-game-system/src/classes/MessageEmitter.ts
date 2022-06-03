import {EventEmitter} from 'events'
import {IMessage} from '../interfaces/IMessage'

export type TMessageListener<M extends IMessage> = (message: M) => void
export type TMessageConstructor<M extends IMessage = IMessage> = new(...params: any[]) => M

/**
 * Замена штатного EventEmitter.
 * В качестве ключа используется не строка, а имя класса экземпляра сообщения.
 * Позволяет создать классы сообщений.
 */
export class MessageEmitter {
	private eventEmitter: EventEmitter = new EventEmitter

	public on<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>) {
		this.eventEmitter.on(MessageClass.name, listener)
	}

	public once<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>) {
		this.eventEmitter.once(MessageClass.name, listener)
	}

	public off<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>) {
		this.eventEmitter.off(MessageClass.name, listener)
	}

	public emit(message: IMessage) {
		this.eventEmitter.emit(message.constructor.name, message)
	}
}