import {IMessage} from 'anubis-message-broker'
import {IData} from '../interfaces/IData'

export class DataReplacingMessage implements IMessage {
	public constructor(
		public readonly previousData: IData,
		public readonly data: IData
	) {}
}