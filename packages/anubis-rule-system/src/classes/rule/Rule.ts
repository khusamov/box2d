import {FakeMessageEmitter, IMessageEmitter} from 'anubis-message-broker'
import {IRule} from '../../interfaces/IRule'

/**
 * Базовая реализация игрового правила.
 * Требуется переопределить init().
 * Метод dispose() по желанию.
 */
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