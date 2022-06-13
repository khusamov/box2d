import {ICommand, ICreator} from 'base-types'
import {Game} from './Game'
import {MessageEmitter} from 'anubis-message-broker'
import {DataStorage} from 'anubis-data-storage'
import {ILevel} from 'anubis-rule-system'
import {CommandTimer} from './CommandTimer'
import {EventEmitter} from 'events'

export class GameCreator implements ICreator<Game> {
	public constructor(private readonly level: ILevel) {}

	public create(): Game {
		const commandQueue: ICommand[] = []
		const eventEmitter = new EventEmitter
		const messageEmitter = new MessageEmitter(eventEmitter)
		const dataStorage = new DataStorage(messageEmitter)

		// TODO Что-то тут не так... слишком много обработчиков навешиваются на UpdateMessage.
		eventEmitter.setMaxListeners(200)

		return new Game(
			this.level,
			messageEmitter,
			new CommandTimer(commandQueue),
			dataStorage,
		)
	}
}