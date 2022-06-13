import {IEntity} from '../../interfaces/IEntity'
import {IData} from '../../interfaces/IData'

export class Entity extends Array<IData | IEntity> implements IEntity {
	public constructor(...nodes: Array<IData | IEntity>) {
		super()
		this.push(...nodes)
	}
}