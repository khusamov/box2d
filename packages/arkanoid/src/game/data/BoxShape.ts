import {IData} from '../base/interfaces/IData';
import {Shape} from './Shape';

export class BoxShape extends Shape implements IData {
	constructor(
		public width: number = 0,
		public height: number = 0
	) {
		super()
	}

	clone() {
		return new BoxShape(
			this.width,
			this.height
		)
	}
}