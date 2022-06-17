import {Contact} from 'planck'
import {getEntityFromContact} from './getEntityFromContact'
import {IContactObject} from '../interfaces/IContactObject'
import {DataConstructor, IData, isData} from 'anubis-data-storage'
import {TContactObjectPair} from '../types/TContactObjectPair'

/**
 * Возвращает информацию о столкнувшихся объектах, если для них найдены идентифицирующие данные.
 * Внимание, предполагается что поле Body.userData из пакета planck содержит ссылку на сущность IEntity.
 * @param contact Информация о столкновении из пакета planck.
 * @param Identification Ссылка на класс с идентификацией сущностей.
 */
export function getContactObjectPair<D extends IData>(contact: Contact, Identification: DataConstructor<D>): TContactObjectPair<D> | undefined {
	// Собираем пару столкнувшихся объектов. В пару попадают сущности, которые имеют данные типа Identification.
	// Итого contactObjectPair в случае успеха должен содержать ссылки на две сущности.
	// Если contactObjectPair содержит меньше двух ссылок, то считаем что пары не существует.
	const contactObjectPair = (
		getEntityFromContact(contact)
			.reduce<IContactObject<D>[]>(
				(result, entity) => {
					const identification = entity.find(isData(Identification))
					if (identification) {
						result.push({
							entity,
							identification
						})
					}
					return result
				},
				[]
			)
	)

	return (
		contactObjectPair.length === 2
			? contactObjectPair as TContactObjectPair<D>
			: undefined
	)
}