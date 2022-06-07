import {INode, parentNodeSymbol} from './INode'
import {IRoot} from './IRoot'

export interface IEntity extends INode, Array<INode> {
	[parentNodeSymbol]?: IEntity | IRoot
}