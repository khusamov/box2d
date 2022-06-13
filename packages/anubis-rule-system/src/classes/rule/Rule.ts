import {IRule} from '../../interfaces/IRule'
import {IMessageBroker, MessageBrokerCreator} from 'anubis-message-broker'

export abstract class Rule implements IRule {
	#messageEmitter: IMessageEmitter = new FakeMessageEmitter

	public get messageBroker(): IMessageBroker {
		return this._messageBroker
	}

	public set messageBroker(value: IMessageBroker) {
		this._messageBroker = value
	}

	public dispose(): void {}

	public abstract init(): void
}