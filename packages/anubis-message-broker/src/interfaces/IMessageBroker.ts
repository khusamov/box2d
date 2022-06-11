import {IMessageEmitter} from './IMessageEmitter'
import {IStartable, IStoppable} from 'base-types'

export interface IMessageBroker extends IMessageEmitter, IStartable, IStoppable {
	pause(): void
}