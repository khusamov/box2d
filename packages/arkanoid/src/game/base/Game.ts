import {EventEmitter} from 'events';
import {Entity} from './Entity';
import {IRule} from './interfaces/IRule';
import {IGameLifeCycle} from './interfaces/IGameLifeCycle';
import {IGameEnvironment} from './interfaces/IGameEnvironment';
import {ILevel} from './interfaces/ILevel';

/**
 * Игра это контейнер правил игры и игровых сущностей.
 */
export class Game implements IGameLifeCycle, IGameEnvironment {
	public readonly entityList: Entity[] = []
	public readonly eventEmitter: EventEmitter = new EventEmitter
	public readonly ruleList: Readonly<IRule[]> = []

	/**
	 * Конструктор игры.
	 * @param level
	 * @param ruleList Дополнительные правила игры.
	 */
	public constructor(private readonly level: ILevel, ...ruleList: IRule[]) {
		this.ruleList = [...level.ruleList, ...ruleList]
	}

	public init() {
		for (const rule of this.ruleList) {
			rule.init?.call(rule, this)
		}
		this.level.init(this)
	}

	public update(timeInterval: number) {
		for (const rule of this.ruleList) {
			rule.update?.call(rule, timeInterval)
		}
	}
}