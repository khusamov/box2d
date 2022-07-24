import {IDisposable} from 'base-types'
import {TMessageConstructor} from '../types/TMessageConstructor'
import {TMessageListener} from '../types/TMessageListener'
import {TUserContext} from '../types/TUserContext'
import {IMessage} from './IMessage'

export interface IMessageEmitter<C extends TUserContext = {}> extends IDisposable {
	on<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M, C>): IDisposable
	once<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M, C>): IDisposable
	emit(...message: IMessage[]): void
}