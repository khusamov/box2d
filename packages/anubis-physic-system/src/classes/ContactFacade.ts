import {Contact} from 'planck'
import {DataConstructor, IData, IEntity} from 'anubis-data-storage'
import {TContactObjectPair} from '../types/TContactObjectPair'
import {getContactObjectPair} from '../functions/getContactObjectPair'

/**
 * Удобная работа с контактом из симулятора физики Planck.
 * Внимание, предполагается что поле Body.userData из пакета planck содержит ссылку на сущность IEntity.
 */
export class ContactFacade<D extends IData> {
	private readonly contactObjectPair: TContactObjectPair<D> | undefined

	public constructor(
		contact: Contact,
		Identification: DataConstructor<D>
	) {
		this.contactObjectPair = getContactObjectPair(contact, Identification)
	}

	/**
	 * Флаг, обозначающий имеют ли столкнувшиеся сущности идентификационные данные.
	 */
	public get hasIdentification() {
		return this.contactObjectPair !== undefined
	}

	/**
	 * Проверить кто столкнулся.
	 * @param predicate1
	 * @param predicate2
	 */
	public isCollided(predicate1: (identification: D) => boolean, predicate2: (identification: D) => boolean): boolean {
		if (this.contactObjectPair === undefined) return false
		return (
			predicate1(this.contactObjectPair[0].identification) && predicate2(this.contactObjectPair[1].identification)
			|| predicate2(this.contactObjectPair[0].identification) && predicate1(this.contactObjectPair[1].identification)
		)
	}

	/**
	 * Найти из пары столкнувшихся объектов определенный объект по его идентификационным данным.
	 * @param predicate
	 */
	public find(predicate: (identification: D) => boolean): IEntity | undefined {
		return (this.contactObjectPair || []).find(contactObject => predicate(contactObject.identification))?.entity
	}
}