import {IDisposable} from 'base-types'
import {TMessageConstructor} from '../types/TMessageConstructor'
import {TMessageListener} from '../types/TMessageListener'
import {IMessage} from './IMessage'

export interface IMessageEmitter {
	on<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>): IDisposable
	once<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>): IDisposable
	emit(...message: IMessage[]): void
}