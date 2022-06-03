import {IData} from '../interfaces/IData'
import {IMessage} from '../interfaces/IMessage'

export class DataAddingMessage implements IMessage {
	public constructor(public readonly data: IData) {}
}