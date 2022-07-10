import {IMessage} from '../interfaces/IMessage'

export interface IMessageListenerDisposer {
	/**
	 * Отмена подписки на сообщение.
	 */
	(): void

	/**
	 * Отмена подписки на сообщение.
	 */
	dispose(): void
}

export type TMessageListenerContext<C extends object> = IMessageListenerDisposer & C

export type TMessageListener<M extends IMessage, C extends object> = (message: M, context: TMessageListenerContext<C>) => void