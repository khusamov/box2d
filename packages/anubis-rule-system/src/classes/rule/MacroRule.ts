import {Rule} from './Rule'
import {RuleArray} from './RuleArray'
import {IRule} from '../../interfaces/IRule'
import {IMessageEmitter} from 'anubis-message-broker'

/**
 * Группа правил, действующих как одно правило.
 */
export class MacroRule extends Rule {
	private readonly rules: RuleArray = new RuleArray

	public constructor(...rules: IRule[]) {
		super()
		this.rules.push(...rules)
	}

	public override get messageEmitter(): IMessageEmitter {
		return super.messageEmitter
	}

	public override set messageEmitter(messageEmitter: IMessageEmitter) {
		super.messageEmitter = messageEmitter
		for (const rule of this.rules) {
			rule.messageEmitter = messageEmitter
		}
	}

	public override init(): void {
		this.rules.init()
	}

	public override dispose() {
		this.rules.dispose()
		super.dispose()
	}
}