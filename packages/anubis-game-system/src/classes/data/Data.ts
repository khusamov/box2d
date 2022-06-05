import {IData} from '../../interfaces/IData'

/**
 * Игровые данные.
 */
export abstract class Data implements IData {
	public abstract clone<C extends this>(): C
}