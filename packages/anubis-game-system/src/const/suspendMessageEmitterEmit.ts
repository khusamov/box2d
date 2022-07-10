import {IMessageEmitter, Message} from 'anubis-message-broker'

const emptyFunction = () => {}

/**
 * Заморозка метода IMessageEmitter.emit().
 * Необходимо для реализации функции 'Пауза в игре'.
 */
export const suspendMessageEmitterEmit: ProxyHandler<IMessageEmitter> = {
	get(target, property, receiver) {
		return (
			property === 'emit'
				? emptyFunction
				: Reflect.get(target, property, receiver)
		)
	}
}

/**
 * Проверка заморозки метода IMessageEmitter.emit().
 * @param messageEmitter
 */
export function isSuspendedMessageEmitter(messageEmitter: IMessageEmitter): boolean {
	class TestMessage extends Message {}
	let result = true
	messageEmitter.once(TestMessage, () => {result = false})
	messageEmitter.emit(TestMessage)
	return result
}