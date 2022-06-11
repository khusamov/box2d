import {Rule} from './Rule'
import {RuleArray} from './RuleArray'
import {IRule} from '../../interfaces/IRule'
import {IMessageBroker, MessageBrokerCreator} from 'anubis-message-broker'

/**
 * Группа правил, действующих как одно правило.
 */
export class MacroRule extends Rule {
	#messageBroker: IMessageBroker = new MessageBrokerCreator().create()
	private readonly rules: RuleArray = new RuleArray

	public constructor(...rules: IRule[]) {
		super()
		this.rules.push(...rules)
	}

	public override get messageBroker(): IMessageBroker {
		return this.#messageBroker
	}

	public override set messageBroker(messageBroker: IMessageBroker) {
		this.#messageBroker = messageBroker
		for (const rule of this.rules) {
			rule.messageBroker = messageBroker
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