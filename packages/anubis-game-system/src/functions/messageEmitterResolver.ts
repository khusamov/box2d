import {createResolver, resolve} from 'inversion-of-control'
import {GlobalMap} from '../classes/GlobalMap'
import {MessageEmitter} from '../classes/message/MessageEmitter'
import {MessageDeferredEmitter} from '../classes/message/MessageDeferredEmitter'

export const messageEmitterResolver = (
	createResolver<MessageEmitter>(
		'MessageEmitter',
		() => (
			resolve<GlobalMap>('GlobalMap').get(
				'MessageEmitter',
				() => new MessageDeferredEmitter
			)
		)
	)
)