import {IData} from '../base/interfaces/IData';

/**
 * @deprecated
 */
export class Mouse implements IData {
	public x: number = 0
	public y: number = 0
	public movementX: number = 0
	public movementY: number = 0

	clone() {
		return new Mouse
	}
}