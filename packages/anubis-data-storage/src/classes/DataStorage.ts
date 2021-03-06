import {IMessageEmitter} from 'anubis-message-broker'
import {IRoot} from '../interfaces/IRoot'
import {IDataStorage} from '../interfaces/IDataStorage'
import {Root} from './Root'

export class DataStorage implements IDataStorage {
	public constructor(
		public readonly messageEmitter: IMessageEmitter,
		public readonly root: IRoot = new Root
	) {}
}