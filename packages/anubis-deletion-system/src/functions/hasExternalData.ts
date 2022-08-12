import {IEntity} from 'anubis-data-storage'
import {isDataLike} from 'anubis-data-storage'
import {externalDataSymbol} from '../const/externalDataSymbol'

/**
 * Проверка сущности, есть ли в ней данные с внешними ссылками или нет.
 * @param {IEntity} entity Проверяемая сущность.
 * @returns {boolean} Возвращает true, если в сущности есть данные с внешними ссылками.
 */
export function hasExternalData(entity: IEntity): boolean {
	const externalDataList = entity.filter(isDataLike).filter(data => externalDataSymbol in data)
	return externalDataList.length > 0
}