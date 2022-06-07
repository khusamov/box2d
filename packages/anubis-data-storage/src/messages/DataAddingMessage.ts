import {IMessage} from 'anubis-message-broker'
import {IData} from '../interfaces/IData'

export class DataAddingMessage implements IMessage {
	public constructor(public readonly data: IData) {}
}