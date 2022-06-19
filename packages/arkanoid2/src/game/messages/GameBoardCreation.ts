import {Message} from 'anubis-message-broker'
import {IEntity} from 'anubis-data-storage'

export class GameBoardCreation extends Message {
	public constructor(public readonly gameBoardEntity: IEntity) {
		super()
	}
}