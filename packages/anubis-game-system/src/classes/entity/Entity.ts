import {IEntity} from '../../interfaces/IEntity'
import {IData} from '../../interfaces/IData'

/**
 * Игровая сущность.
 */
export class Entity extends Array<IData> implements IEntity {
	public clone<C extends this>(): C {
		// TODO Реализовать метод Entity.clone()
		throw new Error('Метод Entity.clone() не реализован')
		//return new Entity()
	}
}