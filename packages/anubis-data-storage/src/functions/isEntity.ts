import {Entity} from '../classes/entity/Entity'
import {INode} from '../interfaces/INode'

/**
 * Помощник для поиска всех сущностей.
 */
export function isEntity(node: INode): node is Entity {
	return node instanceof Entity
}