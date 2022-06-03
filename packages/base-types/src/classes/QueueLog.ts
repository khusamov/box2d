import {IQueue} from '../interfaces';

interface ILog<T> {
	enqueue: T[]
	dequeue: T[]
}

export class QueueLog<T> {
	private readonly queueProxy: IQueue<T>

	private log: ILog<T> = {
		enqueue: [],
		dequeue: []
	}

	public get sourceQueue() {
		return this.queue
	}

	public get loggedQueue() {
		return this.queueProxy
	}

	public static create<T>(queue: IQueue<T>): [IQueue<T>, QueueLog<T>] {
		const queueLog = new QueueLog(queue)
		return [queueLog.loggedQueue, queueLog]
	}

	public constructor(private queue: IQueue<T>) {
		this.queueProxy = (
			new Proxy(queue, {
				get: this.proxyHandlerGet.bind(this)
			})
		)
	}

	private proxyHandlerGet(target: IQueue<T>, property: string | symbol, receiver: any): any {
		const origin = Reflect.get(target, property, receiver)
		switch (property) {
			case 'enqueue': return this.createEnqueue(target, origin)
			case 'dequeue': return this.createDequeue(target, origin)
			default: return origin
		}
	}

	private createEnqueue(target: IQueue<T>, origin: IQueue<T>['enqueue']) {
		return (
			(...items: T[]): void => {
				this.log.enqueue.push(...items)
				origin.call(target, ...items)
			}
		)
	}

	private createDequeue(target: IQueue<T>, origin: IQueue<T>['dequeue']) {
		return (
			(): T | undefined => {
				const item = origin.call(target)
				if (item) {
					this.log.dequeue.push(item)
				}
				return item
			}
		)
	}
}