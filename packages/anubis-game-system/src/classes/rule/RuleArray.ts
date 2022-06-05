import {IRule} from '../../interfaces/IRule'

/**
 * Массив правил.
 * Предназначен для одновременного вызова одноименных методов.
 */
export class RuleArray extends Array<IRule> {
	public execute(): void {
		for (const rule of this) {
			rule.execute()
		}
	}

	public dispose(): void {
		for (const rule of this) {
			rule.dispose()
		}
	}
}