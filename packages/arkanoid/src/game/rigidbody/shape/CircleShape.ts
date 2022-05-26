import {Data} from '../../base/Data';

export class CircleShape extends Data {
	constructor(
		public radius: number = 0,
		public density: number = 0
	) {
		super();
	}
}