import {IData} from '../interfaces/IData'

export type DataConstructor<D extends Object> = abstract new(...params: any[]) => D

/**
 * Помощник для поиска данных определенного класса.
 * @param DataClass Ссылка на класс данных, экземпляры которых требуется найти.
 * @result Возвращает предикат для таких методов массива как find() и filter().
 */
export function isData<D extends IData>(DataClass: DataConstructor<D>) {
	return (data: Object): data is D => data instanceof DataClass
}