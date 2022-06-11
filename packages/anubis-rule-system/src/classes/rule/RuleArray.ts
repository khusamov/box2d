import {IRule} from '../../interfaces/IRule'

/**
 * Массив правил.
 * Предназначен для одновременного вызова одноименных методов.
 */
export class RuleArray extends Array<IRule> {
	public init(): void {
		for (const rule of this) {
			rule.init()
		}
	}

	public dispose(): void {
		for (const rule of this) {
			rule.dispose()
		}
	}
}