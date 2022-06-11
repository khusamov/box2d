import {ICommand, IDisposable} from 'base-types'
import {IMessageBroker} from 'anubis-message-broker'

/**
 * Правило игры.
 *
 * Реализует шаблон ICommand, где метод execute() используется
 * для инициализации правила игры и он вызывается один раз перед началом игры.
 *
 * Также реализует IDisposable для возможности освобождать ресурсы,
 * которые были заняты данным правилом игры.
 */
export interface IRule extends ICommand, IDisposable {
	/**
	 * Правило игры связывается с внешним миром только через брокер сообщений.
	 * Например, если нужны игровые данные, то нужно создать одноразовую подписку (once)
	 * на сообщение UpdateMessage, в котором будет ссылка на IDataStorage.
	 */
	messageBroker: IMessageBroker
}