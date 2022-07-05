import {Body} from 'planck'
import {IDataStorage} from 'anubis-data-storage'

/**
 * Простой способ поиска сущностей.
 * TODO В будущем заменить на anubis-identification-system.
 */
export interface IJointFindBody {
	findBodyA?: (dataStorage: IDataStorage) => Body
	findBodyB?: (dataStorage: IDataStorage) => Body
}