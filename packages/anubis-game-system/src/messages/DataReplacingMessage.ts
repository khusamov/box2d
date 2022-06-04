import {IData} from '../interfaces/IData'
import {Message} from '../classes/Message'

export class DataReplacingMessage extends Message {
	public constructor(
		public readonly previousData: IData,
		public readonly data: IData
	) {
		super()
	}
}