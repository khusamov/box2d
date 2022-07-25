import {DataStorage} from 'anubis-data-storage'
import {MessageEmitter} from 'anubis-message-broker'
import {IRuleContext} from 'anubis-rule-system'
import {EventEmitter} from 'events'

/**
 * Создать игровой контекст.
 */
export function createRuleContext(): IRuleContext {
	const eventEmitter = new EventEmitter
	// TODO Что-то тут не так... слишком много обработчиков навешиваются на UpdateMessage.
	eventEmitter.setMaxListeners(200)
	const messageEmitter = new MessageEmitter(eventEmitter)

	const dataStorage = new DataStorage(messageEmitter)
	return {messageEmitter, dataStorage}
}