import {ICreator} from 'base-types'
import {resolve} from 'inversion-of-control'
import {IEntity} from '../../interfaces/IEntity'
import {IData} from '../../interfaces/IData'
import {MessageEmitter} from '../message/MessageEmitter'
import {DataAddingOperation} from '../data/operation/DataAddingOperation'
import {Entity} from './Entity'

/**
 * @event DataAddingMessage
 */
export class EntityCreator implements ICreator<IEntity> {
	private readonly dataList: IData[]

	public constructor(...dataList: IData[]) {
		this.dataList = dataList
	}

	public create() {
		const entityDataList = resolve<IData[]>('EntityDataList')
		const messageEmitter = resolve<MessageEmitter>('MessageEmitter')

		// Создать новую сущность.
		const entity = new Entity()
		entityDataList.push(entity)

		// Добавить данные в новую сущность.
		const dataAddingOperation = new DataAddingOperation(entity, entityDataList, messageEmitter)
		dataAddingOperation.execute(...this.dataList)

		return entity
	}
}