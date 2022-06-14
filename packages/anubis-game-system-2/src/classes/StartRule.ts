import {Rule} from 'anubis-rule-system'
import {UpdateMessage} from '../messages/UpdateMessage'
import {StartMessage} from '../messages/StartMessage'

export abstract class StartRule extends Rule {
	public override init() {
		this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
			this.start(new StartMessage(dataStorage))
		})
	}

	/**
	 * Вызывается один раз в начале игры.
	 * @param message
	 * @protected
	 */
	protected abstract start(message: StartMessage): void
}