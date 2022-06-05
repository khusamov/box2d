import {IEntity} from '../interfaces/IEntity'
import {IData} from '../interfaces/IData'
import {EntitySymbol} from '../classes/entity/EntitySymbol'

/**
 * Помощник для поиска данных, которые принадлежат к заданной сущности.
 * @param entity Искомая сущность.
 * @result Возвращает предикат для таких методов массива как find() и filter().
 */
export function belongToEntity(entity: IEntity) {
	return (data: IData) => data[EntitySymbol] === entity
}