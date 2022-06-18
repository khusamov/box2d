import {Body} from 'planck'
import {IBodyDef} from '../interfaces/IBodyDef'
import {Data} from 'anubis-data-storage'

/**
 * Данные для создания твердого тела.
 * Могут содержаться только в корне сущности, для которой создается твердое тело.
 */
export class RigidbodyData extends Data {
	public constructor(
		public readonly bodyDef: IBodyDef,
		public readonly body?: Body
	) {
		super()
	}
}