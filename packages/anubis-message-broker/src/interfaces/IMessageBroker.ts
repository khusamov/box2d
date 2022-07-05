import {IMessageEmitter} from './IMessageEmitter'
import {IStartable, IStoppable} from 'base-types'

/**
 *  @deprecated
 */
export interface IMessageBroker extends IMessageEmitter, IStartable, IStoppable {
	pause(): void
}