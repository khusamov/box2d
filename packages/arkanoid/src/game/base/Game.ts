import {EventEmitter} from 'events';
import {Entity} from './Entity';
import {IRule} from './interfaces/IRule';
import {IGameLifeCycle} from './interfaces/IGameLifeCycle';
import {IGameEnvironment} from './interfaces/IGameEnvironment';

export class Game implements IGameLifeCycle, IGameEnvironment {
	public readonly entityList: Entity[] = []
	public readonly eventEmitter: EventEmitter = new EventEmitter

	public constructor(public readonly ruleList: Readonly<IRule[]> = []) {}

	public init() {
		for (const rule of this.ruleList) {
			rule.init?.call(rule, this)
		}
	}

	public update(timeInterval: number) {
		for (const rule of this.ruleList) {
			rule.update?.call(rule, timeInterval)
		}
	}
}