import {IRule} from '../interfaces/IRule'
import {IMessageBroker, MessageBrokerCreator} from 'anubis-message-broker'

export class Rule implements IRule {
	public messageBroker: IMessageBroker = new MessageBrokerCreator().create()
	public dispose(): void {}
	public execute(): void {}
}