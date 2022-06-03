import {IMessage} from '../interfaces/IMessage'
import {IEntity} from '../interfaces/IEntity'

export class EntityDestructionMessage implements IMessage {
	constructor(public readonly entity: IEntity) {}
}