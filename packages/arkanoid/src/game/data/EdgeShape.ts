import {IData} from '../base/interfaces/IData';
import {Shape} from './Shape';

export class EdgeShape extends Shape implements IData {
	constructor(
		public x1: number = 0,
		public y1: number = 0,
		public x2: number = 0,
		public y2: number = 0
	) {
		super()
	}

	clone() {
		return new EdgeShape(
			this.x1,
			this.y1,
			this.x2,
			this.y2
		)
	}
}