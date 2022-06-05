import {DisposableArray, ICommand, IDisposable} from 'base-types'
import {resolve} from 'inversion-of-control'
import {IMessage} from '../../interfaces/IMessage'
import {TMessageListener} from './MessageEmitter'

/**
 * Отложенный слушатель сообщений.
 *
 * Обычный слушатель это функция, которая сразу выполняется при приходе сообщения.
 * Отложенный слушатель это функция, которая при приходе сообщения создает команду
 * для обработки этого сообщения и размещает команду в очередь команд.
 */
export class MessageDeferredListener<M extends IMessage> implements IDisposable {
	#disposer: DisposableArray = new DisposableArray

	public constructor(private listener: TMessageListener<M>) {}

	public handler(message: M) {
		const command = new DisposableCommand(
			() => {
				this.listener(message)
				this.#disposer.splice(this.#disposer.indexOf(command), 1)
			}
		)
		this.#disposer.push(command)
		resolve<ICommand[]>('CommandQueue').push(command)
	}

	public dispose() {
		this.#disposer.dispose()
	}
}

class DisposableCommand implements ICommand, IDisposable {
	public constructor(private action: Function) {}
	public execute() {
		this.action()
	}
	public dispose() {
		this.execute = () => {}
	}
}