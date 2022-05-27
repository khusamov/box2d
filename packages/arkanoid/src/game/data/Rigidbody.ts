import {Body, } from 'planck';
import {IData} from '../base/interfaces/IData';

export class Rigidbody implements IData {
	public body: Body | undefined

	constructor(
		public type: 'static' | 'kinematic' | 'dynamic',
		public x: number = 0,
		public y: number = 0
	) {}

	clone() {
		return new Rigidbody(
			this.type,
			this.x,
			this.y
		)
	}
}