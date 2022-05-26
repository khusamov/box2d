import {Data} from '../base/Data';
import {Body, } from 'planck';

export class Rigidbody extends Data {
	public body: Body | undefined

	constructor(
		public type: 'static' | 'kinematic' | 'dynamic',
		public x: number = 0,
		public y: number = 0
	) {
		super();
	}
}