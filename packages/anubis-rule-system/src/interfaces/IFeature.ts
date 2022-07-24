import {TUserContext} from 'anubis-message-broker/src'
import {IRule} from './IRule'
import {IRuleContext} from './IRuleContext'

/**
 * Группа правил, объединенных в уровень игры.
 */
export interface IFeature<C extends TUserContext = {}> extends IRule<C> {
	/**
	 * Инициализировать все правила данной фичи.
	 * Вызывается один раз перед началом игры.
	 * @param {IRuleContext<C>} context Контекст правила игры.
	 */
	init(context: IRuleContext<C>): void
}