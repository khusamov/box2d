import {createResolver, resolve} from 'inversion-of-control'
import {GlobalMap} from '../classes/GlobalMap'

export const messageQueueResolver = createResolver<Object[]>('MessageQueue', () => {
	return resolve<GlobalMap>('GlobalMap').get('MessageQueue', () => [])
})