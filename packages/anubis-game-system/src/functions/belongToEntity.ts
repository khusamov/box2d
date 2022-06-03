import {IEntity} from '../interfaces/IEntity'
import {IData} from '../interfaces/IData'
import {EntitySymbol} from '../classes/EntitySymbol'

export function belongToEntity(entity: IEntity) {
	return (data: IData) => data[EntitySymbol] === entity
}