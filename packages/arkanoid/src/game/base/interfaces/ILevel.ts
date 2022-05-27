import {IRule} from './IRule';
import {IGameEnvironment} from './IGameEnvironment';
import {IGameLifeCycle} from './IGameLifeCycle';

export interface ILevel {
	readonly ruleList: IRule[]
	init(game: IGameEnvironment & IGameLifeCycle): void
}