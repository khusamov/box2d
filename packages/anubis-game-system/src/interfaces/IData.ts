import {EntitySymbol} from '../classes/entity/EntitySymbol'
import {IEntity} from './IEntity'

/**
 * Игровые данные.
 * Являются простым немутабельным объектом.
 * Хранятся в глобальном массивее игровых данных.
 * Предоставляют метод для клонирования. Клонируются только простые свойства и объекты с методом clone().
 * Также хранится ссылка на сущность, к которой данные принадлежат.
 */
export interface IData extends Object {
	[EntitySymbol]?: IEntity
	clone(): IData
}