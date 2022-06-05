import {MessageEmitter, TMessageConstructor, TMessageListener} from './MessageEmitter'
import {IMessage} from '../../interfaces/IMessage'
import {IDisposable} from 'base-types'
import {MessageDeferredListener} from './MessageDeferredListener'

/**
 * Отложенные обработчики сообщений.
 */
export class MessageDeferredEmitter extends MessageEmitter implements IDisposable {
	private readonly disposers: IDisposable[] = []

	public dispose() {
		for (const disposer of this.disposers) {
			disposer.dispose()
		}
	}

	protected override addListener<M extends IMessage>(method: 'on' | 'once', MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>): IDisposable {
		const deferredListener = new MessageDeferredListener(listener)
		const disposer1 = super.addListener(method, MessageClass, deferredListener.handler)
		const disposer: IDisposable = {
			dispose() {
				deferredListener.dispose()
				disposer1.dispose()

			}
		}
		this.disposers.push(disposer)
		return {
			dispose: () => {
				disposer.dispose()
				this.disposers.splice(this.disposers.indexOf(disposer), 1)
			}
		}
	}
}