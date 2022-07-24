import {IRule} from '../../interfaces/IRule'
import {IRuleContext} from '../../interfaces/IRuleContext'

/**
 * Базовая реализация игрового правила.
 * Требуется переопределить init().
 * Метод dispose() по желанию.
 */
export abstract class Rule implements IRule {
	/**
	 * Вызывается один раз перед началом игры.
	 * Обязательно требуется определить в дочернем классе.
	 * @param {IRuleContext<C>} context Контекст правила игры.
	 */
	public abstract init(context: IRuleContext): void

	/**
	 * Освободить ресурсы правила игры.
	 */
	public dispose(): void {}
}