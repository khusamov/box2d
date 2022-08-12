import {Rule} from 'anubis-rule-system'
import {DataAfterAddingMessage, DataStorageFacade, IEntity} from 'anubis-data-storage'
import {DeletedMarkData} from '../data/DeletedMarkData'

/**
 * Базовое правило удаления игровых данных.
 * Предназначено для упрощения создания своих правил удаления игровых данных.
 */
export abstract class DeletionRule extends Rule {
	public execute(): void {
		this.context.messageEmitter.on(DataAfterAddingMessage, ({data}) => {
			if (data instanceof DeletedMarkData) {
				this.deletion(new DataStorageFacade(this.context.dataStorage).createDataFasade(data).entity)
			}
		})
	}

	/**
	 * Обработчик удаления игровых данных сущности.
	 * @param deletedEntity Удаляемая сущность.
	 * @protected
	 */
	protected abstract deletion(deletedEntity: IEntity): void
}