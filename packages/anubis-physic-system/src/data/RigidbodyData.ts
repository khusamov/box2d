import {Body} from 'planck'
import {IBodyDef} from '../interfaces/IBodyDef'
import {Data} from 'anubis-data-storage'

export class RigidbodyData extends Data {
	public constructor(
		public bodyDef: IBodyDef,
		public body?: Body
	) {
		super()
	}

	public clone(): any {}
}