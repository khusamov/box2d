import {TUserContext} from 'anubis-message-broker/src'
import {IDisposable} from 'base-types'
import {IRuleContext} from './IRuleContext'

/**
 * Правило игры.
 * Это объект с методом init(), который инициализирует правило игры.
 * На вход метода подается контекст правила (ссылка на менеджер сообщений, ссылка на хранилище игровых данных).
 */
export interface IRule<C extends TUserContext = {}> extends IDisposable {
	/**
	 * Вызывается один раз перед началом игры.
	 * @param {IRuleContext<C>} context Контекст правила игры.
	 */
	init(context: IRuleContext<C>): void
}