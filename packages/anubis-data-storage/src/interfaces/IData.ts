import {INode, parentNodeSymbol} from './INode'
import {IEntity} from './IEntity'

export interface IData extends INode {
	[parentNodeSymbol]?: IEntity
}