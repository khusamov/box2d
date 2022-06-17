import {IMessage} from 'anubis-message-broker'
import {IData} from '../interfaces/IData'

/**
 * Сообщение после удаления игровых данных.
 */
export class DataAfterDeletingMessage implements IMessage {
	public constructor(public readonly data: IData) {}
}