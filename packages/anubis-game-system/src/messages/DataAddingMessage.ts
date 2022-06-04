import {IData} from '../interfaces/IData'
import {Message} from '../classes/Message'

export class DataAddingMessage extends Message {
	public constructor(public readonly data: IData) {
		super()
	}
}