export type Listener = (...args: any[]) => void

export interface IEventEmitter {
	on(type: string | number, listener: Listener): this
	once(type: string | number, listener: Listener): this
	emit(type: string | number, ...args: any[]): boolean
	off(type: string | number, listener: Listener): this
	setMaxListeners(n: number): this
	getMaxListeners(): number
}