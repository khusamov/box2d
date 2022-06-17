import {IMessage} from 'anubis-message-broker'
import {IData} from '../interfaces/IData'

/**
 * Сообщение после добавления игровых данных.
 */
export class DataAfterAddingMessage implements IMessage {
	public constructor(public readonly data: IData) {}
}