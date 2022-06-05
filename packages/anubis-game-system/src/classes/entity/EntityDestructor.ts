import {IEntity} from '../../interfaces/IEntity'
import {resolve} from 'inversion-of-control'
import {IData} from '../../interfaces/IData'
import {MessageEmitter} from '../message/MessageEmitter'
import {belongToEntity} from '../../functions/belongToEntity'
import {DataDeletingOperation} from '../data/operation/DataDeletingOperation'
import {IDestructor} from '../../interfaces/IDestructor'

/**
 * Уничтожение игровой сущности.
 * Сначала удаляются все данные сущности, а затем и сама сущность.
 * @event DataDeletingMessage
 */
export class EntityDestructor implements IDestructor {
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
	}
}