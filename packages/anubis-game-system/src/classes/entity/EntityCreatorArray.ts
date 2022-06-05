import {ICreator} from 'base-types'
import {IEntity} from '../../interfaces/IEntity'

export class EntityCreatorArray extends Array<ICreator<IEntity>> {
	public create(): IEntity[] {
		return this.map(creator => creator.create())
	}
}