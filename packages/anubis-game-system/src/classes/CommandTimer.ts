import {ICommand, Timer} from 'base-types'
import {resolve} from 'inversion-of-control'

/**
 * Игровой таймер.
 * Запускает на бесконечное выполнение команд из очереди CommandQueue.
 * Команды выполняются друг за другом без промежутков времени.
 */
export class CommandTimer extends Timer {
	constructor() {
		super(
			0,
			() => resolve<ICommand[]>('CommandQueue').shift()?.execute()
		)
	}
}