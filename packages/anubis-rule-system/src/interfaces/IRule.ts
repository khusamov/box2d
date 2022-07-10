import {IDisposable} from 'base-types'
import {IRuleContext} from './IRuleContext'

/**
 * Правило игры.
 */
export interface IRule extends IDisposable {
	/**
	 *
	 */
	//readonly context: IRuleContext

	/**
	 * Вызывается один раз перед началом игры.
	 * @param context Контекст игры со ссылками на объекты IDataStorage и IMessageEmitter.
	 */
	init(context: IRuleContext): void
}