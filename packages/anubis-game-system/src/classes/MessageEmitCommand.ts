import {ICommand} from 'base-types'
import {resolve} from 'inversion-of-control'
import {MessageEmitter} from './MessageEmitter'
import {IMessage} from '../interfaces/IMessage'

/**
 * Команда для обработки сообщений из очереди resolve<IMessage[]>('MessageQueue').
 * Каждое сообщение попадает в resolve<MessageEmitter>('MessageEmitter').
 * Команда после этого себя помещает заново в очередь команд resolve<ICommand[]>('CommandQueue').
 * Этот процесс можно заверишть вызовом метода stop().
 */
export class MessageEmitCommand implements ICommand {
	private active: boolean = true

	public execute() {
		const message = resolve<IMessage[]>('MessageQueue').shift()
		if (message) {
			resolve<MessageEmitter>('MessageEmitter').emit(message)
		}

		if (this.active) {
			resolve<ICommand[]>('CommandQueue').push(this)
		}
	}

	public stop() {
		this.active = false
	}
}