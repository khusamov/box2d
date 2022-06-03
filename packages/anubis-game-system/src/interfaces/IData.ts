import {EntitySymbol} from '../classes/EntitySymbol'
import {IEntity} from './IEntity'

export interface IData extends Object {
	[EntitySymbol]?: IEntity
}