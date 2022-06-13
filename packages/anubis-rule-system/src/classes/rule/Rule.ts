import {IRule} from '../../interfaces/IRule'
import {IMessageEmitter} from 'anubis-message-broker'
import {FakeMessageEmitter} from '../FakeMessageEmitter'

export abstract class Rule implements IRule {
	#messageEmitter: IMessageEmitter = new FakeMessageEmitter

	public get messageEmitter(): IMessageEmitter {
		return this.#messageEmitter
	}

	public set messageEmitter(messageEmitter: IMessageEmitter) {
		this.#messageEmitter = messageEmitter
	}

	public dispose(): void {}

	public abstract init(): void
}