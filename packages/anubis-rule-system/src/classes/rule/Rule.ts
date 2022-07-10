import {IRule} from '../../interfaces/IRule'
import {IRuleContext} from '../../interfaces/IRuleContext'

/**
 * Базовая реализация игрового правила.
 * Требуется переопределить init().
 * Метод dispose() по желанию.
 */
export abstract class Rule implements IRule {
	public dispose(): void {}

	/**
	 * Вызывается один раз перед началом игры.
	 * @param context Контекст игры со ссылками на объекты IDataStorage и IMessageEmitter.
	 */
	public abstract init(context: IRuleContext): void
}