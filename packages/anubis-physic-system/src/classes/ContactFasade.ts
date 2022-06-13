import {DataConstructor, IData, IEntity} from 'anubis-data-storage'
import {Contact} from 'planck'
import {TContactObjectPair} from '../types/TContactObjectPair'
import {getContactObjectPair} from '../functions/getContactObjectPair'

export class ContactFasade<D extends IData> {
	private readonly contactObjectPair: TContactObjectPair<D> | undefined

	public constructor(
		contact: Contact,
		Identification: DataConstructor<D>
	) {
		this.contactObjectPair = getContactObjectPair(contact, Identification)
	}

	public get hasIdentification() {
		return this.contactObjectPair !== undefined
	}

	public isCollided(predicate1: (identification: D) => boolean, predicate2: (identification: D) => boolean): boolean {
		if (this.contactObjectPair === undefined) return false
		return (
			predicate1(this.contactObjectPair[0].identification) && predicate2(this.contactObjectPair[1].identification)
			|| predicate2(this.contactObjectPair[0].identification) && predicate1(this.contactObjectPair[1].identification)
		)
	}

	public find(predicate: (identification: D) => boolean): IEntity | undefined {
		return (this.contactObjectPair || []).find(contactObject => predicate(contactObject.identification))?.entity
	}
}