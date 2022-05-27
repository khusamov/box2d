import {EventEmitter} from 'events';
import {Entity} from './Entity';
import {IRule} from './interfaces/IRule';
import {IGameLifeCycle} from './interfaces/IGameLifeCycle';
import {IGameEnvironment} from './interfaces/IGameEnvironment';
import {ILevel} from './interfaces/ILevel';

export class Game implements IGameLifeCycle, IGameEnvironment {
	public readonly entityList: Entity[] = []
	public readonly eventEmitter: EventEmitter = new EventEmitter
	public readonly ruleList: Readonly<IRule[]> = []

	public constructor(private readonly level: ILevel) {
		this.ruleList = level.ruleList
	}

	public init() {
		this.level.init(this)
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