import {register} from 'inversion-of-control'
import {globalMapResolver} from '../functions/globalMapResolver'
import {commandQueueResolver} from '../functions/commandQueueResolver'
import {messageEmitterResolver} from '../functions/messageEmitterResolver'
import {entityDataListResolver} from '../functions/entityDataListResolver'

export class Anubis {
	public static register() {
		register(globalMapResolver)
		register(commandQueueResolver)
		register(messageEmitterResolver)
		register(messageEmitterResolver)
		register(entityDataListResolver)
	}
}