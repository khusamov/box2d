import {IData} from '../base/interfaces/IData';

export class BoxShape implements IData {
	constructor(
		public width: number = 0,
		public height: number = 0,
		public density: number = 0
	) {}

	clone() {
		return new BoxShape(
			this.width,
			this.height,
			this.density
		)
	}
}