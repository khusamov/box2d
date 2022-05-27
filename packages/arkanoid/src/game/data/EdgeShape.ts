import {IData} from '../base/interfaces/IData';

export class EdgeShape implements IData {
	public density: number = 0

	constructor(
		public x1: number = 0,
		public y1: number = 0,
		public x2: number = 0,
		public y2: number = 0
	) {}

	clone() {
		return new EdgeShape(
			this.x1,
			this.y1,
			this.x2,
			this.y2
		)
	}
}