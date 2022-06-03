import {IEntity} from '../interfaces/IEntity'
import {resolve} from 'inversion-of-control'
import {IData} from '../interfaces/IData'
import {MessageEmitter} from './MessageEmitter'
import {EntityDestructionMessage} from '../messages/EntityDestructionMessage'
import {belongToEntity} from '../functions/belongToEntity'
import {DataDeletingOperation} from './DataDeletingOperation'

/**
 * Уничтожение игровой сущности.
 * Сначала удаляются все данные сущности, а затем и сама сущность.
 * @event DataDeletingMessage
 * @event EntityDestructionMessage
 */
export class EntityDestructor {
	public constructor(private readonly entity: IEntity) {}

	public destroy() {
		const entityDataList = resolve<IData[]>('EntityDataList')
		const messageEmitter = resolve<MessageEmitter>('MessageEmitter')
		const dataDeletingOperation = new DataDeletingOperation(this.entity, entityDataList, messageEmitter)

		// Удалить все данные игровой сущности.
		const dataList = entityDataList.filter(belongToEntity(this.entity))
		dataDeletingOperation.execute(...dataList)

		// Удалить саму сущность.
		entityDataList.splice(entityDataList.indexOf(this.entity), 1)

		messageEmitter.emit(new EntityDestructionMessage(this.entity))
	}
}