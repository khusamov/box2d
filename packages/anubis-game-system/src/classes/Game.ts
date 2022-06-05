import {ICommand} from 'base-types'
import {resolve} from 'inversion-of-control'
import {ILevel} from '../interfaces/ILevel'
import {IData} from '../interfaces/IData'
import {isEntity} from '../functions/isEntity'
import {IMessage} from '../interfaces/IMessage'
import {MessageEmitCommand} from './message/MessageEmitCommand'
import {CommandTimer} from './CommandTimer'
import {EntityDestructor} from './entity/EntityDestructor'

/**
 * Глобальное управление игрой.
 * Инициализация уровня, запуск игры, постановка на паузу, остановка игры, уничтожение всех данных игры.
 */
export class Game {
	public static readonly timer = new CommandTimer

	public static init(level: ILevel) {
		level.execute()
		resolve<IMessage[]>('MessageQueue').push(...level.messages || [])
		resolve<ICommand[]>('CommandQueue').push(new MessageEmitCommand)
	}

	public static dispose() {
		// Останавливаем выполнение команд игры.
		this.timer.stop()
		// Уничтожаем все игровые сущности.
		const entityDestructorList = (
			resolve<IData[]>('EntityDataList')
				.filter(isEntity)
				.map(entity => new EntityDestructor(entity))
		)
		for (const entityDestructor of entityDestructorList) {
			entityDestructor.destroy()
		}
	}
}