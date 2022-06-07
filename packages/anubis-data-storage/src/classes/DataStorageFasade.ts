import {IEntity} from '../interfaces/IEntity'
import {IDataStorage} from '../interfaces/IDataStorage'
import {EntityAddingOperation} from './entity/EntityAddingOperation'
import {EntityDeletingOperation} from './entity/EntityDeletingOperation'

export class DataStorageFasade {
	private readonly entityAddingOperation: EntityAddingOperation
	private readonly entityDeletingOperation: EntityDeletingOperation

	public constructor(private readonly dataStorage: IDataStorage) {
		this.entityAddingOperation = new EntityAddingOperation(
			this.dataStorage.messageBroker,
			this.dataStorage.root
		)
		this.entityDeletingOperation = new EntityDeletingOperation(
			this.dataStorage.messageBroker
		)
	}

	public addEntity(...entities: IEntity[]) {
		this.entityAddingOperation.add(...entities)
		return this
	}

	public deleteEntity(...entities: IEntity[]) {
		this.entityDeletingOperation.delete(...entities)
	}
}