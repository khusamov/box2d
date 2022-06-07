import {IMessageBroker} from 'anubis-message-broker'
import {IRoot} from './IRoot'

export interface IDataStorage {
	readonly messageBroker: IMessageBroker
	readonly root: IRoot
}