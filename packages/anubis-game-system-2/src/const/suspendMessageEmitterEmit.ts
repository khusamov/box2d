import {IMessageEmitter} from 'anubis-message-broker'

/**
 * Заморозка метода IMessageEmitter.emit().
 * Необходимо для реализации функции 'Пауза в игре'.
 */
export const suspendMessageEmitterEmit: ProxyHandler<IMessageEmitter> = {
	get(target, property, receiver) {
		if (property === 'emit') return () => {}
		return Reflect.get(target, property, receiver)
	}
}