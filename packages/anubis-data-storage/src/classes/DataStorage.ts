import {IMessageBroker} from 'anubis-message-broker'
import {IRoot} from '../interfaces/IRoot'
import {IDataStorage} from '../interfaces/IDataStorage'

export class DataStorage implements IDataStorage {
	public constructor(
		public readonly messageBroker: IMessageBroker,
		public readonly root: IRoot
	) {}
}