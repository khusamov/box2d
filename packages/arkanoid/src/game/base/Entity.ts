import {IEntity} from './interfaces/IEntity';
import {IData} from './interfaces/IData';

type DataConstructor<D extends IData> = new(...params: any[]) => D
type DataParameters<D extends IData> = ConstructorParameters<DataConstructor<D>>
type TDataPredicate = (data: IData) => boolean
const isDataClass = <D extends IData>(object: object): object is DataConstructor<D> => object.toString().startsWith('class')

/**
 * Игровая сущность.
 */
export class Entity implements IEntity {
	constructor(
		public name: string,

		/**
		 * Внимание, в массиве данных не может находится элемент одного типа более одного экземпляра.
		 * @private
		 */
		public data: IData[] = []
	) {}

	/**
	 * Добавление данных в игровую сущность.
	 * entity.addData(Movable, 100, 200)
	 * @param DataClass
	 * @param parameters
	 */
	public addData<D extends IData>(DataClass: DataConstructor<D>, ...parameters: DataParameters<D>) {
		if (this.hasData<D>(DataClass)) {
			throw new Error(`Повторное добавление данных '${DataClass.name}' в игровую сущность`)
		}
		this.data.push(new DataClass(...parameters))
	}

	/**
	 * Замена данных в игровой сущности.
	 * @param DataClass
	 * @param parameters
	 */
	public replaceData<D extends IData>(DataClass: DataConstructor<D>, ...parameters: DataParameters<D>) {
		this.deleteData(DataClass)
		this.addData(DataClass, ...parameters)
	}

	/**
	 * Получить данные. Если данные не найдены, то они будут созданы.
	 * @param DataClass
	 */
	public getData<D extends IData>(DataClass: DataConstructor<D>): D {
		let data = this.data.find(data => data instanceof DataClass)

		if (!data) {
			throw new Error(`Данные '${DataClass.name}' не найдены`)
		}

		return data as D
	}

	/**
	 * Удалить данные.
	 * @param DataClass
	 */
	public deleteData<D extends IData>(DataClass: DataConstructor<D>) {
		this.data = this.data.filter(data => !(data instanceof DataClass))
	}

	/**
	 * Проверка наличия данных.
	 * @param predicate
	 */
	public hasData<D extends IData>(predicate: DataConstructor<D> | TDataPredicate): boolean {
		const found = this.data.find(
			data => isDataClass(predicate)
				? data instanceof predicate
				: predicate(data)
		)
		return found !== undefined
	}

	/**
	 * Клонирование игровой сущности для шаблона 'Прототип'.
	 * @link https://refactoring.guru/ru/design-patterns/prototype
	 */
	public clone(): Entity {
		const dataCloneList = this.data.map(data => data.clone())
		return new Entity(this.name, dataCloneList)
	}
}

