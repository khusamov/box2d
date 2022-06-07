import {INode} from './INode'
import {IEntity} from './IEntity'

export interface IRoot extends INode, Array<IEntity> {}