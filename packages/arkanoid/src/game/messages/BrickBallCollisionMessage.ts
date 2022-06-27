import {Message} from 'anubis-message-broker'
import {IEntity} from 'anubis-data-storage'

export class BrickBallCollisionMessage extends Message {
	public constructor(public readonly brickEntity: IEntity) {
		super()
	}
}