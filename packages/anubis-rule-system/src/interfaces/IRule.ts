import {IDisposable} from 'base-types'
import {IMessageEmitter} from 'anubis-message-broker'

/**
 * Правило игры.
 */
export interface IRule extends IDisposable {
	/**
	 * Правило игры связывается с внешним миром только через брокер сообщений.
	 * Например, если нужны игровые данные, то нужно создать одноразовую подписку (once)
	 * на сообщение UpdateMessage, в котором будет ссылка на IDataStorage.
	 */
	messageEmitter: IMessageEmitter

	/**
	 * Контекст игры со ссылками на объекты IDataStorage и IMessageEmitter.
	 */
	//readonly context: IRuleContext

	/**
	 * Вызывается один раз перед началом игры.
	 */
	init(): void
}