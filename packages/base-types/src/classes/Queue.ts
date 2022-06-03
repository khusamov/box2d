import {IQueue} from '../interfaces';

/**
 * Простая реализация очереди.
 */
export class Queue<I> implements IQueue<I> {
	private storage: Array<I> = []

	public enqueue<E extends I>(...items: E[]): void {
		this.storage.push(...items);
	}

	public dequeue(): I | undefined {
		return this.storage.shift()
	}

	public get items(): Readonly<Array<I>> {
		return this.storage
	}
}