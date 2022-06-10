import {ICommand} from 'base-types'
import {IMessage} from '../interfaces/IMessage'
import {IMessageEmitter} from '../interfaces/IMessageEmitter'
import {IMessageEmitCommand} from '../interfaces/IMessageEmitCommand'

/**
 * Команда для обработки сообщений из очереди resolve<IMessage[]>('MessageQueue').
 * Каждое сообщение попадает в resolve<MessageEmitter>('MessageEmitter').
 * Команда после этого себя помещает заново в очередь команд resolve<ICommand[]>('CommandQueue').
 * Этот процесс можно заверишть вызовом метода stop().
 */
export class MessageEmitCommand implements IMessageEmitCommand {
	private active: boolean = true

	public constructor(
		private readonly messageQueue: IMessage[],
		private readonly messageEmitter: IMessageEmitter,
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

	public stop() {
		this.active = false
	}
}