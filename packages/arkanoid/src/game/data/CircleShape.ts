import {IData} from '../base/interfaces/IData';
import {Shape} from './Shape';

export class CircleShape extends Shape implements IData {
	constructor(
		public radius: number = 0
	) {
		super()
	}

	clone() {
		return new CircleShape(
			this.radius
		)
	}
}