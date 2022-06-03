import {IEntity} from '../interfaces/IEntity'
import {Entity} from './Entity'
import {IData} from '../interfaces/IData'
import {DataAddingOperation} from './DataAddingOperation'
import {resolve} from 'inversion-of-control'
import {MessageEmitter} from './MessageEmitter'

/**
 * @event EntityCreationMessage
 */
export class EntityCreator {
	public constructor() {}

	public create(...dataList: IData[]): IEntity {
		const entityDataList = resolve<IData[]>('EntityDataList')
		const messageEmitter = resolve<MessageEmitter>('MessageEmitter')

		const entity = new Entity()
		entityDataList.push(entity)

		const dataAddingOperation = new DataAddingOperation(entity, entityDataList, messageEmitter)
		dataAddingOperation.execute(...dataList)

		return entity
	}
}