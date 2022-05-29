import {IRule} from './interfaces/IRule';
import {IGameEnvironment} from './interfaces/IGameEnvironment';

export class MacroRule implements IRule {
	private readonly rules: IRule[]

	constructor(...rules: IRule[]) {
		this.rules = rules
	}

	init(game: IGameEnvironment) {
		for (const rule of this.rules) {
			rule.init?.call(rule, game)
		}
	}

	update(timeInterval: number) {
		for (const rule of this.rules) {
			rule.update?.call(rule, timeInterval)
		}
	}
}