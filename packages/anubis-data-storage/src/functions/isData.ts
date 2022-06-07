import {IData} from '../interfaces/IData'
import {DataConstructor} from '../types/DataConstructor'
import {INode} from '../interfaces/INode'

/**
 * Помощник для поиска данных определенного класса.
 * @param DataClass Ссылка на класс данных, экземпляры которых требуется найти.
 * @result Возвращает предикат для таких методов массива как find() и filter().
 */
export function isData<D extends IData>(DataClass: DataConstructor<D>) {
	return (data: INode): data is D => data instanceof DataClass
}