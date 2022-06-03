import {RuleHelper} from './RuleHelper'
import {IMessage} from '../interfaces/IMessage'
import {MessageEmitter, TMessageConstructor, TMessageListener} from './MessageEmitter'
import {resolve} from 'inversion-of-control'
import {ICommand} from 'base-types'

export class MessageEmitterRuleHelper extends RuleHelper {
	protected once<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>) {
		return this.addListener<M>('once', MessageClass, listener)
	}

	protected on<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>) {
		return this.addListener<M>('on', MessageClass, listener)
	}

	protected emit(message: IMessage) {
		const messageEmitter = resolve<MessageEmitter>('MessageEmitter')
		messageEmitter.emit(message)
	}

	private addListener<M extends IMessage>(method: 'on' | 'once', MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>) {
		const messageEmitter = resolve<MessageEmitter>('MessageEmitter')
		const deferred = this.createDeferredListener(listener)
		messageEmitter[method]<M>(MessageClass, deferred)
		return () => messageEmitter.off(MessageClass, deferred)
	}

	private createDeferredListener<M extends IMessage>(listener: TMessageListener<M>) {
		const commandQueue = resolve<ICommand[]>('CommandQueue')
		return (
			(messageObject: any) => {
				commandQueue.push({
					execute: () => listener(messageObject)
				})
			}
		)
	}
}