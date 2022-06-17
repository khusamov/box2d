import {IMessage} from 'anubis-message-broker'
import {IData} from '../interfaces/IData'

/**
 * Сообщение перед удалением игровых данных.
 */
export class DataBeforeDeletingMessage implements IMessage {
	public constructor(public readonly data: IData) {}
}