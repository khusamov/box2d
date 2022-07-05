import {IRule} from '../../interfaces/IRule'
import {IMessageEmitter, ProhibitedMessageEmitter} from 'anubis-message-broker'

/**
 * Базовая реализация игрового правила.
 * Требуется переопределить init().
 * Метод dispose() по желанию.
 */
export abstract class Rule implements IRule {
	#messageEmitter: IMessageEmitter = new ProhibitedMessageEmitter

	public get messageEmitter(): IMessageEmitter {
		return this.#messageEmitter
	}

	public set messageEmitter(messageEmitter: IMessageEmitter) {
		this.#messageEmitter = messageEmitter
	}

	// public readonly context: IRuleContext = {
	// 	messageEmitter: new ProhibitedMessageEmitter,
	// 	dataStorage: new DataStorage(new ProhibitedMessageEmitter)
	// }

	public dispose(): void {}

	public abstract init(): void
}