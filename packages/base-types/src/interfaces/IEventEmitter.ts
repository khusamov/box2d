/**
 * TODO Попробовать избавиться от IEventEmitter.
 */
export interface IEventEmitter {
	on(eventName: string | symbol, listener: (...args: any[]) => void): this
}