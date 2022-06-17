import {IMessageEmitter} from 'anubis-message-broker'
import {IEntity} from '../../interfaces/IEntity'
import {IData} from '../../interfaces/IData'
import {DataAfterDeletingMessage} from '../../messages/DataAfterDeletingMessage'
import {isDataLike} from '../../functions/isDataLike'
import {isEntityLike} from '../../functions/isEntityLike'
import {DataBeforeDeletingMessage} from '../../messages/DataBeforeDeletingMessage'

/**
 * Удаление игровых данных.
 * @event DataBeforeDeletingMessage
 * @event DataAfterDeletingMessage
 */
export class DataDeletingOperation {
	public constructor(
		private readonly messageEmitter: IMessageEmitter,
		private readonly parentEntity: IEntity
	) {}

	public delete(...datas: IData[]) {
		for (const data of datas) {
			// Сообщение перед удалением игровых данных.
			this.messageEmitter.emit(new DataBeforeDeletingMessage(data))
			// Удалить игровые данные.
			this.parentEntity.splice(this.parentEntity.indexOf(data), 1)
			// Сообщение после удаления игровых данных.
			this.messageEmitter.emit(new DataAfterDeletingMessage(data))
		}
	}

	public deleteAll(recursive: boolean = false) {
		// Удалить все игровые данные на первом уровне.
		this.delete(...this.parentEntity.filter(isDataLike))

		if (recursive) {
			// Удалить все игровыее данные на вложенных уровнях.
			this.parentEntity.filter(isEntityLike).forEach(entity => {
				new DataDeletingOperation(this.messageEmitter, entity).deleteAll(recursive)
			})
		}
	}
}