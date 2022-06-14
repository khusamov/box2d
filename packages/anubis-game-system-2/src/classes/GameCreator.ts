import {ICreator} from 'base-types'
import {Game} from './Game'
import {MessageEmitter} from 'anubis-message-broker'
import {DataStorage} from 'anubis-data-storage'
import {ILevel} from 'anubis-rule-system'
import {EventEmitter} from 'events'

export class GameCreator implements ICreator<Game> {
	public constructor(private readonly level: ILevel) {}

	public create(): Game {
		const eventEmitter = new EventEmitter
		// TODO Что-то тут не так... слишком много обработчиков навешиваются на UpdateMessage.
		eventEmitter.setMaxListeners(200)
		const messageEmitter = new MessageEmitter(eventEmitter)

		const dataStorage = new DataStorage(messageEmitter)

		return new Game(this.level, messageEmitter, dataStorage)
	}
}