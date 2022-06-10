import {DataConstructor} from '../../types/DataConstructor'
import {IData} from '../../interfaces/IData'
import {DataStorageFasade} from '../DataStorageFasade'
import {isData} from '../../functions/isData'
import {IEntity} from '../../interfaces/IEntity'

export class EntityCollection<D extends IData> {
	public constructor(
		private readonly dataStorageFasade: DataStorageFasade,
		private readonly DataClass: DataConstructor<D>
	) {}

	public find(predicate: (value: D, index: number, obj: D[]) => unknown, thisArg?: any): IEntity | undefined {
		const data = this.dataStorageFasade.filter(isData(this.DataClass)).find(predicate, thisArg)
		return data ? this.dataStorageFasade.createDataFasade(data).entity : undefined
	}

	public filter(predicate: (value: D, index: number, array: D[]) => unknown, thisArg?: any): IEntity[] {
		const data = this.dataStorageFasade.filter(isData(this.DataClass)).filter(predicate, thisArg)
		return data.map(data => this.dataStorageFasade.createDataFasade(data).entity)
	}
}