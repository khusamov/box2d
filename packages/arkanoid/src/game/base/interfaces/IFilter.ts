import {IEntity} from './IEntity'

/**
 * Фильтр игровых сущностей.
 */
export interface IFilter {
	predicate: (entity: IEntity) => boolean
}