import {Body} from 'planck'
import {IBodyDef} from '../interfaces/IBodyDef'
import {Data} from 'anubis-game-system'

export class RigidbodyData extends Data {
	constructor(
		public bodyDef: IBodyDef,
		public body?: Body
	) {
		super()
	}
}