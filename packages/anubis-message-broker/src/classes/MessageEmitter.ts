import {IDisposable} from 'base-types'
import {createMessageListenerContext} from '../functions/createMessageListenerContext'
import {IEventEmitter} from '../interfaces/IEventEmitter'
import {IMessage} from '../interfaces/IMessage'
import {IMessageEmitter} from '../interfaces/IMessageEmitter'
import {TMessageConstructor} from '../types/TMessageConstructor'
import {TMessageListener} from '../types/TMessageListener'
import {TUserContext} from '../types/TUserContext'
import {InvalidMessageError} from './InvalidMessageError'

type TListener = (...args: any[]) => void
interface IListenerRef {
	listener: TListener
}
const forbiddenListener = () => {
	throw new Error('Не определен слушатель')
}

/**
 * Замена штатного EventEmitter.
 * В качестве ключа используется не строка, а имя класса экземпляра сообщения.
 * Позволяет создать классы сообщений.
 * Для группировки сообщений используйте наследование классов сообщений.
 * Есть возможность задать пользовательский контекст для всех слушателей.
 */
export class MessageEmitter<C extends TUserContext> implements IMessageEmitter<C> {
	public constructor(
		/**
		 * Базовый IEventEmitter.
		 */
		private readonly eventEmitter: IEventEmitter,
		/**
		 * Пользовательский контекст для всех слушателей.
		 */
		private readonly context: C = Object()
	) {}

	/**
	 * Подписка на сообщение.
	 * @param MessageClass Ссылка на класс сообщения.
	 * @param listener Обработчик сообщения.
	 */
	public on<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M, C>): IDisposable {
		return this.addListener('on', MessageClass, listener)
	}

	/**
	 * Одноразовая подписка на сообщение.
	 * @param MessageClass Ссылка на класс сообщения.
	 * @param listener Обработчик сообщения.
	 */
	public once<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M, C>): IDisposable {
		return this.addListener('once', MessageClass, listener)
	}

	/**
	 * Передача сообщения всем слушателям.
	 * @param message Экземпляр сообщения.
	 */
	public emit(message: IMessage) {
		if (message.constructor.name === 'Function') {
			throw new InvalidMessageError
		}
		this.eventEmitter.emit(message.constructor.name, message)
	}

	/**
	 * Освобождение ресурсов MessageEmitter.
	 * Удаляются все слушатели.
	 */
	public dispose(): void {
		this.eventEmitter.removeAllListeners()
	}

	/**
	 * Добавить слушателя.
	 * @param method Метод добавления: on - обычная подписка, once - одноразовая подписка.
	 * @param MessageClass Ссылка на класс сообщения.
	 * @param messageListener Обработчик сообщения.
	 * @private
	 */
	private addListener<M extends IMessage>(method: 'on' | 'once', MessageClass: TMessageConstructor<M>, messageListener: TMessageListener<M, C>): IDisposable {
		const listenerRef: IListenerRef = {
			listener: forbiddenListener
		}

		const dispose = () => this.eventEmitter.off(method, listenerRef.listener)

		const messageListenerContext = createMessageListenerContext({dispose}, this.context)
		listenerRef.listener = (message: M) => messageListener(message, messageListenerContext)

		this.eventEmitter[method](MessageClass.name, listenerRef.listener)

		return {dispose}
	}
}