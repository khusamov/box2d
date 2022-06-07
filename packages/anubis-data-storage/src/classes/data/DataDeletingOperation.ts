import {IMessageBroker} from 'anubis-message-broker'
import {IEntity} from '../../interfaces/IEntity'
import {IData} from '../../interfaces/IData'
import {DataDeletingMessage} from '../../messages/DataDeletingMessage'
import {isDataLike} from '../../functions/isDataLike'
import {isEntityLike} from '../../functions/isEntityLike'

export class DataDeletingOperation {
	public constructor(
		private readonly messageBroker: IMessageBroker,
		private readonly parentEntity: IEntity
	) {}

	public delete(...datas: IData[]) {
		for (const data of datas) {
			this.parentEntity.splice(this.parentEntity.indexOf(data), 1)
			this.messageBroker.emit(new DataDeletingMessage(data))
		}
	}

	public deleteAll(recursive: boolean = false) {
		this.delete(...this.parentEntity.filter(isDataLike))

		if (recursive) {
			this.parentEntity.filter(isEntityLike).forEach(entity => {
				new DataDeletingOperation(this.messageBroker, entity).deleteAll(recursive)
			})
		}
	}
}