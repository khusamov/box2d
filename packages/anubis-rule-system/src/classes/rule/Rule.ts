import {IRule} from '../../interfaces/IRule'
import {IRuleContext} from '../../interfaces/IRuleContext'
import {NotDefinedRuleContextError} from './NotDefinedRuleContextError'

/**
 * Базовая реализация игрового правила.
 * Конструктор предназначен для ввода пользовательских параметров игрового правила.
 * Требуется переопределить execute().
 * Метод dispose() по желанию.
 */
export abstract class Rule implements IRule {
	private _context: IRuleContext | undefined

	/**
	 * Игровой контекст.
	 * @returns {IRuleContext}
	 * @protected
	 */
	protected get context(): IRuleContext {
		if (!this._context) {
			throw new NotDefinedRuleContextError
		}
		return this._context
	}

	/**
	 * Вызывается один раз перед началом игры.
	 * @param {IRuleContext} context Контекст правила игры.
	 */
	public init(context: IRuleContext): void {
		this._context = context
		this.execute()
	}

	/**
	 * Вызывается один раз перед началом игры.
	 * Обязательно требуется определить в дочернем классе.
	 */
	protected abstract execute(): void

	/**
	 * Освободить ресурсы правила игры.
	 */
	public dispose(): void {}
}