import {IDisposable} from 'base-types'
import {IMessageEmitter} from '../interfaces/IMessageEmitter'

const dummyDisposable: IDisposable = {dispose() {}}

/**
 * MessageEmitter, который ничего не делает.
 */
export class DummyMessageEmitter implements IMessageEmitter {
	dispose(): void {}

	emit(): void {}

	on(): IDisposable {
		return dummyDisposable
	}

	once(): IDisposable {
		return dummyDisposable
	}
}