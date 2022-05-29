import {IData} from '../base/interfaces/IData';

/**
 * Просто так сущность удалять нельзя.
 * Для удаления сущности следует в него добавить данные Deleted
 * и соответствующее правило его удалит.
 */
export class Deleted implements IData {
	clone() {
		return new Deleted
	}
}