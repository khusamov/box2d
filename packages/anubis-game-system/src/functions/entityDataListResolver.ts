import {createResolver, resolve} from 'inversion-of-control'
import {GlobalMap} from '../classes/GlobalMap'

const dependencyEntityDataListName = 'EntityDataList'
const createEntityDataList = () => []

export const entityDataListResolver = (
	createResolver(
		dependencyEntityDataListName,
		() => resolve<GlobalMap>('GlobalMap').get(
			dependencyEntityDataListName,
			createEntityDataList
		)
	)
)