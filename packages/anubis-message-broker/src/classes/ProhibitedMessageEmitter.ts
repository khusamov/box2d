import {IDisposable} from 'base-types'
import {IMessageEmitter} from '../interfaces/IMessageEmitter'

const replaceMessageError = new Error('Замените ProhibitedMessageEmitter на MessageEmitter')

/**
 * Запрещенный к использованию IMessageEmitter.
 */
export class ProhibitedMessageEmitter implements IMessageEmitter {
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