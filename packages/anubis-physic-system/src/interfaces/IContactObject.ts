import {IData, IEntity} from 'anubis-data-storage'

/**
 * Информация о столкнувшихся сущностях.
 */
export interface IContactObject<D extends IData> {
	entity: IEntity,
	identification: D
}