import {IEntity} from '../interfaces/IEntity'
import {IDataStorage} from '../interfaces/IDataStorage'
import {EntityAddingOperation} from './entity/EntityAddingOperation'
import {EntityDeletingOperation} from './entity/EntityDeletingOperation'
import {EntityFasade} from './entity/EntityFasade'
import {INode} from '../interfaces/INode'
import {IData} from '../interfaces/IData'
import {DataFasade} from './data/DataFasade'
import {EntityCollection} from './entity/EntityCollection'
import {DataConstructor} from '../types/DataConstructor'

export class DataStorageFasade {
	private readonly entityAddingOperation: EntityAddingOperation
	private readonly entityDeletingOperation: EntityDeletingOperation

	public constructor(private readonly dataStorage: IDataStorage) {
		this.entityAddingOperation = new EntityAddingOperation(
			this.dataStorage.messageEmitter,
			this.dataStorage.root
		)
		this.entityDeletingOperation = new EntityDeletingOperation(
			this.dataStorage.messageEmitter
		)
	}

	public addEntity(...entities: IEntity[]) {
		this.entityAddingOperation.add(...entities)
		return this
	}

	public deleteEntity(...entities: IEntity[]) {
		this.entityDeletingOperation.delete(...entities)
	}

	public createEntityFasade(entity: IEntity) {
		return new EntityFasade(this.dataStorage.messageEmitter, entity)
	}

	public createDataFasade(data: IData) {
		return new DataFasade(this.dataStorage.messageEmitter, data)
	}

	public createEntityCollection<D extends IData>(DataClass: DataConstructor<D>) {
		return new EntityCollection(this, DataClass)
	}

	public find<T extends INode, S extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined
	public find<T extends INode>(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined {
		return (this.allNodes as T[]).find(predicate, thisArg)
	}

	public filter<T extends INode, S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[]
	public filter<T extends INode>(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[] {
		return (this.allNodes as T[]).filter(predicate, thisArg)
	}

	private get allNodes(): INode[] {
		return this.dataStorage.root.flat(Infinity)
	}
}