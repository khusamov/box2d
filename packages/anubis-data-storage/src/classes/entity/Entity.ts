import {IEntity} from '../../interfaces/IEntity'
import {IData} from '../../interfaces/IData'
import {parentNodeSymbol} from '../../interfaces/INode'
import {IRoot} from '../../interfaces/IRoot'
import {SimpleArray} from 'base-types'

export class Entity extends SimpleArray<IData | IEntity> implements IEntity {
	[parentNodeSymbol]?: IEntity | IRoot
}