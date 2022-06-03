import {createResolver} from 'inversion-of-control'
import {GlobalMap} from '../classes/GlobalMap'

export const globalMapResolver = createResolver<GlobalMap>('GlobalMap', () => {
	let globalMap = Reflect.get(window, 'GlobalMap')
	if (!globalMap) {
		globalMap = new GlobalMap
		Reflect.set(window, 'GlobalMap', globalMap)
	}
	return globalMap
})