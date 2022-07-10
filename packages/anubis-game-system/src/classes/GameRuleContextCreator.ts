import {ICreator} from 'base-types'
import {IRuleContext} from 'anubis-rule-system'
import {EventEmitter} from 'events'
import {MessageEmitter} from 'anubis-message-broker'
import {DataStorage} from 'anubis-data-storage'

export class GameRuleContextCreator implements ICreator<IRuleContext> {
	public create(): IRuleContext {
		const eventEmitter = new EventEmitter
		// TODO Что-то тут не так... слишком много обработчиков навешиваются на UpdateMessage.
		eventEmitter.setMaxListeners(200)
		const messageEmitter = new MessageEmitter(eventEmitter)

		const dataStorage = new DataStorage(messageEmitter)

		return {messageEmitter, dataStorage}
	}
}