import {RuleHelper} from './RuleHelper'
import {IMessage} from '../../interfaces/IMessage'
import {MessageEmitter, TMessageConstructor, TMessageListener} from '../message/MessageEmitter'
import {resolve} from 'inversion-of-control'
import {DisposableArray, IDisposable} from 'base-types'

export class SubscribeRuleHelper extends RuleHelper {
	private readonly disposers: DisposableArray = new DisposableArray

	public once<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>) {
		return this.addListener<M>('once', MessageClass, listener)
	}

	public on<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>) {
		return this.addListener<M>('on', MessageClass, listener)
	}

	public dispose() {
		this.disposers.dispose()
	}

	private addListener<M extends IMessage>(method: 'on' | 'once', MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>): IDisposable {
		const messageEmitter = resolve<MessageEmitter>('MessageEmitter')
		const disposer = messageEmitter[method]<M>(MessageClass, listener)
		this.disposers.push(disposer)
		return {
			dispose: () => {
				disposer.dispose()
				this.disposers.splice(this.disposers.indexOf(disposer), 1)
			}
		}
	}
}