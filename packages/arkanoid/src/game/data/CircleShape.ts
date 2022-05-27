import {IData} from '../base/interfaces/IData';

export class CircleShape implements IData {
	constructor(
		public radius: number = 0,
		public density: number = 0
	) {}

	clone() {
		return new CircleShape(
			this.radius,
			this.density
		)
	}
}