import {IData} from '../interfaces/IData'
import {IEntity} from '../interfaces/IEntity'

export class DataNotFoundError extends Error {
	constructor(
		private data: IData,
		private targetEntity: IEntity
	) {
		super('Данные не принадлежат к сущности')
		console.group('Попытка удалить данные из сущности, к которой они не принадлежат')
		console.log('Данные', this.data)
		console.log('Сущность', this.targetEntity)
		console.groupEnd()
	}
}