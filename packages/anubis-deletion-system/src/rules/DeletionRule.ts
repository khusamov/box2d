import {Rule} from 'anubis-rule-system'
import {DataAfterAddingMessage, DataStorageFasade, IDataStorage, IEntity} from 'anubis-data-storage'
import {DeletedMarkData} from '../data/DeletedMarkData'
import {UpdateMessage} from 'anubis-game-system-2'

/**
 * Базовое правило удаления игровых данных.
 * Предназначено для упрощения создания своих правил удаления игровых данных.
 */
export abstract class DeletionRule extends Rule {
	public init(): void {
		this.messageEmitter.on(DataAfterAddingMessage, ({data}) => {
			if (data instanceof DeletedMarkData) {
				this.messageEmitter.once(UpdateMessage, ({dataStorage}) => {
					this.deletion(
						new DataStorageFasade(dataStorage).createDataFasade(data).entity,
						dataStorage
					)
				})
			}
		})
	}

	/**
	 * Обработчик удаления игровых данных сущности.
	 * @param deletedEntity Удаляемая сущность.
	 * @param dataStorage Хранилище игровых сущностей.
	 * @protected
	 */
	protected abstract deletion(deletedEntity: IEntity, dataStorage: IDataStorage): void
}