import {IRule} from '../../interfaces/IRule'
import {IRuleContext} from '../../interfaces/IRuleContext'

/**
 * Массив правил.
 * Предназначен для одновременного вызова одноименных методов.
 */
export class RuleArray extends Array<IRule> {
	public init(context: IRuleContext): void {
		for (const rule of this) {
			rule.init(context)
		}
	}

	public dispose(): void {
		for (const rule of this) {
			rule.dispose()
		}
	}
}