import {IDisposable} from 'base-types'
import {IMessageEmitter} from '../interfaces/IMessageEmitter'

const replaceMessageError = new Error('Замените FakeMessageEmitter на MessageEmitter')

export class FakeMessageEmitter implements IMessageEmitter {
    dispose(): void {
        throw replaceMessageError
    }

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