import {IData} from '../interfaces/IData'
import {Entity} from '../classes/entity/Entity'

/**
 * Помощник для поиска всех сущностей.
 * @param data
 */
export function isEntity(data: IData): data is Entity {
	return data instanceof Entity
}