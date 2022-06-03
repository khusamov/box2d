import {IEntity} from '../interfaces/IEntity'
import {Entity} from './Entity'
import {IData} from '../interfaces/IData'
import {DataAddingOperation} from './DataAddingOperation'
import {resolve} from 'inversion-of-control'
import {MessageEmitter} from './MessageEmitter'
import {EntityCreationMessage} from '../messages/EntityCreationMessage'

/**
 * @event EntityCreationMessage
 */
export class EntityCreator {
	public constructor() {}

	public create(...dataList: IData[]): IEntity {
		const entityDataList = resolve<IData[]>('EntityDataList')
		const messageEmitter = resolve<MessageEmitter>('MessageEmitter')

		const entity = new Entity()

		const dataAddingOperation = new DataAddingOperation(entity, entityDataList, messageEmitter)
		dataAddingOperation.execute(...dataList)
		messageEmitter.emit(new EntityCreationMessage(entity))

		return entity
	}
}