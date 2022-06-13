import {IMessageEmitter} from 'anubis-message-broker'
import {IRoot} from './IRoot'

export interface IDataStorage {
	readonly messageEmitter: IMessageEmitter
	readonly root: IRoot
}