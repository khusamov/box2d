import {ICommand} from 'base-types'
import {IMessage} from '../interfaces/IMessage'
import {IMessageEmitter} from '../interfaces/IMessageEmitter'
import {IMessageEmitCommand} from '../interfaces/IMessageEmitCommand'

/**
 * Команда передачи сообщений из очереди IMessage[] в передатчик сообщений IMessageEmitter.
 * После передачи команда заново размещает себя в очереди команд ICommand[].
 * Этот процесс можно заверишть вызовом метода stop().
 */
export class MessageEmitCommand implements IMessageEmitCommand {
	private active: boolean = true

	public constructor(
		private readonly messageEmitter: IMessageEmitter,
		private readonly messageQueue: IMessage[],
		private readonly commandQueue: ICommand[]
	) {}

	public execute() {
		const message = this.messageQueue.shift()

		if (message) {
			this.messageEmitter.emit(message)
		}

		if (this.active) {
			this.commandQueue.push(this)
		}
	}

	public start() {
		this.active = true
	}

	public stop() {
		this.active = false
	}
}