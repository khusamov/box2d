import {ICommand} from 'base-types'
import {createResolver, resolve} from 'inversion-of-control'
import {GlobalMap} from '../classes/GlobalMap'

export const commandQueueResolver = createResolver<ICommand[]>('CommandQueue', () => {
	return resolve<GlobalMap>('GlobalMap').get('CommandQueue', () => [])
})