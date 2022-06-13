import {IMessageEmitter} from 'anubis-message-broker'
import {IDisposable} from 'base-types'

const replaceMessageError = new Error('Замените FakeMessageEmitter на MessageEmitter')

export class FakeMessageEmitter implements IMessageEmitter {
	emit(): void {
		throw replaceMessageError
	}

	on(): IDisposable {
		throw replaceMessageError
	}

	once(): IDisposable {
		throw replaceMessageError
	}
}