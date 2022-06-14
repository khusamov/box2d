import {IMessage} from '../interfaces/IMessage'
import {IDisposable} from 'base-types'
import {IEventEmitter} from '../interfaces/IEventEmitter'
import {TMessageConstructor} from '../types/TMessageConstructor'

/**
 * Вспомогательный класс для MessageEmitter.
 */
export class MessageListenerDisposer<M extends IMessage> implements IDisposable {
	public constructor(
		private readonly eventEmitter: IEventEmitter,
		private readonly MessageClass: TMessageConstructor<M>,
		public listener: (message: M) => void = () => {}
	) {}

	/**
	 * Метод dispose() определен таким образом потому, что в обработчиках сообщений
	 * этот метод будет чаще использоваться в оторванном виде, например (..., {dispose}).
	 */
	public dispose = () => this.eventEmitter.off(this.MessageClass.name, this.listener)
}