import {DataAfterDeletingMessage, DataStorageFacade, IEntity} from 'anubis-data-storage'
import {hasExternalData} from '../functions/hasExternalData'
import {DeletionRule} from './DeletionRule'

/**
 * Правило удаления игровых сущностей.
 * Предназначено для удаления сущностей, когда в них не осталось внешних ссылок.
 * Если внешние ссылки остались, то дожидаемся, когда их удалят соотвествующие правила.
 */
export class EntityDeletionRule extends DeletionRule {
	protected deletion(deletedEntity: IEntity): void {
		const dataStorageFacade = new DataStorageFacade(this.context.dataStorage)
		const deleteEntity = () => dataStorageFacade.deleteEntity(deletedEntity)

		// Если внешних ссылок нет, то сущность удаляем немедленно.
		if (!hasExternalData(deletedEntity)) {
			deleteEntity()
			return
		}

		// Иначе, раз ссылки остались, то дожидаемся когда их удалят.
		// Ставим обработчик сообщения об удалении игровых данных и если были удалены все ссылки, то удаляем сущность.
		this.context.messageEmitter.on(DataAfterDeletingMessage, ({data}, dispose) => {
			if (
				dataStorageFacade.createDataFasade(data).entity === deletedEntity
				&& !hasExternalData(deletedEntity)
			) {
				deleteEntity()
				dispose()
			}
		})
	}
}