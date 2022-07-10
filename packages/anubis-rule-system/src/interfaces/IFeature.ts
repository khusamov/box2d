import {IRule} from './IRule'
import {IRuleContext} from './IRuleContext'

export interface IFeature extends IRule {
	/**
	 * Инициализировать все правила данной фичи.
	 * @param context Контекст игры со ссылками на объекты IDataStorage и IMessageEmitter.
	 */
	init(context: IRuleContext): void
}