import {DeletionRule} from './DeletionRule'
import {DataStorageFasade, IDataStorage, IEntity, isDataLike} from 'anubis-data-storage'
import {externalDataSymbol} from '../const/externalDataSymbol'

/**
 * Правило удаления игровых сущностей.
 * Предназначено для удаления сущностей, когда в них не осталось внешних ссылок.
 */
export class EntityDeletionRule extends DeletionRule {
	protected deletion(deletedEntity: IEntity, dataStorage: IDataStorage): void {
		const externalDataList = deletedEntity.filter(isDataLike).filter(data => externalDataSymbol in data)
		if (externalDataList.length <= 0) {
			new DataStorageFasade(dataStorage).deleteEntity(deletedEntity)
		}
	}
}