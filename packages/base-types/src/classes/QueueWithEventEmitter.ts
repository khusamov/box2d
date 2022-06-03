import {EventEmitter} from 'events';
import {IEventEmitter} from '../interfaces';
import {Queue} from './Queue';

export class QueueWithEventEmitter<T> extends Queue<T> implements IEventEmitter {
	private eventEmitter = new EventEmitter

	public override enqueue<I extends T = T>(...items: I[]): void {
		this.eventEmitter.emit('before-enqueue', this, ...items)
		super.enqueue(...items);
		this.eventEmitter.emit('enqueue', this, ...items)
	}

	public override dequeue(): T | undefined {
		const removed = super.dequeue()
		this.eventEmitter.emit('dequeue', this, removed)
		return removed
	}

	public on(eventName: string | number, listener: (...args: any[]) => void): this {
		this.eventEmitter.on(eventName, listener)
		return this
	}
}