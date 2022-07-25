import {TUserContext} from 'anubis-message-broker'
import {IRuleContext} from 'anubis-rule-system'
import {ITimerLifecycle} from 'base-types'
import {IRule} from 'anubis-rule-system'

export interface IGame<C extends TUserContext = {}> extends IRule<C>, ITimerLifecycle {
	/**
	 * Инициализировать все правила игры.
	 */
	init(context: IRuleContext<C>): void

	/**
	 * Освобождение ресурсов, которые были заняты правилами игры.
	 * В основном это удаление слушателей сообщений.
	 */
	dispose(): void
}