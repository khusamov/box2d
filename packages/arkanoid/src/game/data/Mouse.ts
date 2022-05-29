import {IData} from '../base/interfaces/IData';

export class Mouse implements IData {
	public x: number = 0
	public y: number = 0

	clone() {
		return new Mouse
	}
}