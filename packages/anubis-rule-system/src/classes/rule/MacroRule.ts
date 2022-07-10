import {Rule} from './Rule'
import {RuleArray} from './RuleArray'
import {IRule} from '../../interfaces/IRule'
import {IRuleContext} from '../../interfaces/IRuleContext'

/**
 * Группа правил, действующих как одно правило.
 */
export class MacroRule extends Rule {
	private readonly rules: RuleArray = new RuleArray

	public constructor(...rules: IRule[]) {
		super()
		this.rules.push(...rules)
	}

	public override init(context: IRuleContext): void {
		this.rules.init(context)
	}

	public override dispose() {
		this.rules.dispose()
		super.dispose()
	}
}