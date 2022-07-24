import {IMessageEmitter} from 'anubis-message-broker'

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