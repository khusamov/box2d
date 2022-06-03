/**
 * TODO Попробовать избавиться от IEventEmitter.
 */
export interface IEventEmitter {
	on(eventName: string | number, listener: (...args: any[]) => void): this
}