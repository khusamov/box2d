import {IData} from '../interfaces/IData'
import {IEntity} from '../interfaces/IEntity'
import {EntitySymbol} from './EntitySymbol'

export class DataFasade {
	public constructor(private data: IData) {}

	public get entity(): IEntity | undefined {
		return Reflect.get(this.data, EntitySymbol)
	}
}