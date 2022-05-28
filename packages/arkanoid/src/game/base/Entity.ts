import {IEntity} from './interfaces/IEntity';
import {DataConstructor, IData, isData} from './interfaces/IData';

export const hasData = <D extends IData>(DataClass: DataConstructor<D>) => (entity: IEntity) => entity.find(isData<D>(DataClass))

/**
 * Игровая сущность.
 */
export class Entity extends Array<IData> implements IEntity {
	constructor(...data: IData[]) {
		super();
		this.push(...data)
	}

	/**
	 * Клонирование игровой сущности для шаблона 'Прототип'.
	 * @link https://refactoring.guru/ru/design-patterns/prototype
	 */
	public clone(): Entity {
		const entity = new Entity
		entity.push(...this.map(data => data.clone()))
		return entity
	}
}

