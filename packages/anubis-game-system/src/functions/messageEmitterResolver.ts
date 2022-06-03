import {createResolver, resolve} from 'inversion-of-control'
import {GlobalMap} from '../classes/GlobalMap'
import {MessageEmitter} from '../classes/MessageEmitter'

export const messageEmitterResolver = (
	createResolver<MessageEmitter>(
		'MessageEmitter',
		() => (
			resolve<GlobalMap>('GlobalMap').get(
				'MessageEmitter',
				() => new MessageEmitter
			)
		)
	)
)