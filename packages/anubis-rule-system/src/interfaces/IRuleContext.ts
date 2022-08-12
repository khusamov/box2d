import {IMessageEmitter} from 'anubis-message-broker'
import {IDataStorage} from 'anubis-data-storage'
import {TUserContext} from 'anubis-message-broker'

/**
 * Контекст правила игры.
 */
export interface IRuleContext<C extends TUserContext = {}> {
	/**
	 * Менеджер сообщений.
	 */
	readonly messageEmitter: IMessageEmitter<C>

	/**
	 * Хранилище игровых данных.
	 */
	readonly dataStorage: IDataStorage
}