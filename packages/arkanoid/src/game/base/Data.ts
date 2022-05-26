import {IData} from './interfaces/IData';

/**
 * Данные игровой сущности.
 */
export class Data implements IData {
	public clone(): Data {
		return new Data
	}
}