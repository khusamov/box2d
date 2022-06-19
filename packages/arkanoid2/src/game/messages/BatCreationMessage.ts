import {Message} from 'anubis-message-broker'
import {IEntity} from 'anubis-data-storage'

export class BatCreationMessage extends Message {
	public constructor(public readonly batEntity: IEntity) {
		super()
	}
}