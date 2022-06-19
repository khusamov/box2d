import {Body} from 'planck'
import {IBodyDef} from '../interfaces/IBodyDef'
import {Data} from 'anubis-data-storage'
import {externalDataSymbol, IExternalData} from 'anubis-deletion-system'

/**
 * Данные для создания твердого тела.
 * Могут содержаться только в корне сущности, для которой создается твердое тело.
 */
export class RigidbodyData extends Data implements IExternalData {
	public readonly [externalDataSymbol] = true

	public constructor(
		public readonly bodyDef: IBodyDef,
		public readonly body?: Body
	) {
		super()
	}
}