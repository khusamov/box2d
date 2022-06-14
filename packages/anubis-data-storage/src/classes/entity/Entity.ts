import {IEntity} from '../../interfaces/IEntity'
import {IData} from '../../interfaces/IData'
import {parentNodeSymbol} from '../../interfaces/INode'
import {IRoot} from '../../interfaces/IRoot'

export class Entity extends Array<IData | IEntity> implements IEntity {
	[parentNodeSymbol]?: IEntity | IRoot
}