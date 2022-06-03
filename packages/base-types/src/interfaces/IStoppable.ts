export interface IStoppable {
	stop(): void
}

export function isStoppable(object: any): object is IStoppable {
	return 'stop' in object && typeof object.stop === 'function'
}