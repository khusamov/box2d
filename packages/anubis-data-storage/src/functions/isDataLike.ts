import {INode} from '../interfaces/INode'
import {IData} from '../interfaces/IData'

export function isDataLike(node: INode): node is IData {
	return !Array.isArray(node)
}