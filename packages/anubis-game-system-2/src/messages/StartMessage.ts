import {Message} from 'anubis-message-broker'
import {IDataStorage} from 'anubis-data-storage'

/**
 * Используется в StartRule.
 */
export class StartMessage extends Message {
	public constructor(
		public readonly dataStorage: IDataStorage
	) {
		super()
	}
}