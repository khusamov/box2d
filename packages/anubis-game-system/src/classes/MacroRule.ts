import {Rule} from './Rule'

export class MacroRule extends Rule {
	private readonly rules: Rule[]

	constructor(...rules: Rule[]) {
		super()
		this.rules = rules
	}

	execute(): void {
		for (const rule of this.rules) {
			rule.execute()
		}
	}
}