import {Body} from 'planck'
import {IDataStorage} from 'anubis-data-storage'

/**
 * Простой способ поиска сущностей.
 * TODO В будущем заменить на anubis-identification-system.
 *
 * Внимание, здесь функции find должны тупо искать в dataStorage объект Body.
 * То есть подписываться на создание сущностей не надо. Это делает вызывающая функция.
 */
export interface IJointFindBody {
	findBodyA: (dataStorage: IDataStorage) => Body | undefined
	findBodyB: (dataStorage: IDataStorage) => Body | undefined
}