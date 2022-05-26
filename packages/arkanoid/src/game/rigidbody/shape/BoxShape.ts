import {Data} from '../../base/Data';

export class BoxShape extends Data {
	constructor(
		public width: number = 0,
		public height: number = 0,
		public density: number = 0
	) {
		super();
	}
}