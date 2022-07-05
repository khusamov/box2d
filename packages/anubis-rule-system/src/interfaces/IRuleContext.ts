import {IMessageEmitter} from 'anubis-message-broker'
import {IDataStorage} from 'anubis-data-storage'

export interface IRuleContext {
	readonly messageEmitter: IMessageEmitter
	readonly dataStorage: IDataStorage
}