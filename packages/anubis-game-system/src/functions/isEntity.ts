import {IData} from '../interfaces/IData'
import {Entity} from '../classes/Entity'

export function isEntity(data: IData): data is Entity {
	return data instanceof Entity
}