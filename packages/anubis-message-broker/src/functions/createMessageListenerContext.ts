import {IDisposable} from 'base-types'
import {TUserContext} from '../types/TUserContext'
import {createDisposableClone} from './createDisposableClone'

/**
 * Создать контекст слушателя.
 * @param disposer Объект для освобождение ресурсов слушателя. Внимание, метод dispose() должен быть открепляемым.
 * @param context Пользовательский контекст.
 */
export function createMessageListenerContext<C extends TUserContext>(disposer: IDisposable, context: C) {
	return Object.assign(
		() => disposer.dispose(),
		createDisposableClone(disposer),
		context
	)
}