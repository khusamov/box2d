import {ICreator} from 'base-types'
import {Game} from './Game'
import {ILevel} from 'anubis-rule-system'
import {GameRuleContextCreator} from './GameRuleContextCreator'

export class GameCreator implements ICreator<Game> {
	public constructor(private readonly level: ILevel) {}

	public create(): Game {
		return (
			new Game(
				new GameRuleContextCreator().create(),
				this.level
			)
		)
	}
}