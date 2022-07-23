import {IDisposable} from 'base-types'
import {TMessageConstructor} from '../types/TMessageConstructor'
import {TMessageListener} from '../types/TMessageListener'
import {IMessage} from './IMessage'

export interface IMessageEmitter<C extends object = {}> extends IDisposable {
	on<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M, C>): IDisposable
	once<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M, C>): IDisposable
	emit(...message: IMessage[]): void
}