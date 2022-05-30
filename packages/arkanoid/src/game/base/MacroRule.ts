import {IRule} from './interfaces/IRule';
import {IGameEnvironment} from './interfaces/IGameEnvironment';

// Этот класс можно назвать еще Feature
// https://github.com/sschmid/Entitas-CSharp/wiki/Unity-Tutorial-Hello-World#step-4---bring-your-systems-together-into-a-feature

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