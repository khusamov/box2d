import {INode} from '../interfaces/INode'
import {IEntity} from '../interfaces/IEntity'

export function isEntityLike(node: INode): node is IEntity {
	return Array.isArray(node)
}