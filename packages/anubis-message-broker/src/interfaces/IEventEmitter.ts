import {EventEmitter} from 'events'

export type Listener = (...args: any[]) => void

type TEventEmitterPickedMethods =
	'on' | 'once' | 'emit' | 'off' |
	'removeAllListeners' |
	'setMaxListeners' | 'getMaxListeners'

export interface IEventEmitter extends Pick<EventEmitter, TEventEmitterPickedMethods> {
	// on(type: string | number, listener: Listener): this
	// once(type: string | number, listener: Listener): this
	// emit(type: string | number, ...args: any[]): boolean
	// off(type: string | number, listener: Listener): this
	// setMaxListeners(n: number): this
	// getMaxListeners(): number
	// removeAllListeners(type?: string | number): this
}