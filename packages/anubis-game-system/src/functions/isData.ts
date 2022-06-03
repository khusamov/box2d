import {IData} from '../interfaces/IData'

export type DataConstructor<D extends Object> = new(...params: any[]) => D

export function isData<D extends IData>(DataClass: DataConstructor<D>) {
	return (data: Object): data is D => data instanceof DataClass
}