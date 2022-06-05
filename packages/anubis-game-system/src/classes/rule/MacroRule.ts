import {Rule} from './Rule'
import {IRule} from '../../interfaces/IRule'
import {RuleArray} from './RuleArray'

/**
 * Группа правил, действующих как одно правило.
 */
export class MacroRule extends Rule {
	private readonly rules: RuleArray = new RuleArray

	public constructor(...rules: IRule[]) {
		super()
		this.rules.push(...rules)
	}

	public execute(): void {
		this.rules.execute()
	}

	public override dispose() {
		this.rules.dispose()
		super.dispose()
	}
}