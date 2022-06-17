import {IMessage} from 'anubis-message-broker'
import {IData} from '../interfaces/IData'

/**
 * Сообщение после замены игровых данных.
 */
export class DataAfterReplacingMessage implements IMessage {
	public constructor(
		public readonly previousData: IData,
		public readonly data: IData
	) {}
}