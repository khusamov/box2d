import {ILevel, IRuleContext} from 'anubis-rule-system'
import {IRule} from 'anubis-rule-system'
import {ICreator} from 'base-types'
import {createRuleContext} from '../functions/createRuleContext'
import {Game} from './Game'

/**
 * Конструктор объекта с игрой.
 */
export class GameCreator implements ICreator<Game> {
	private _context: IRuleContext | undefined
	private readonly rules: IRule[]

	public get context(): IRuleContext {
		if (!this._context) {
			throw new Error('Контекст не определен')
		}
		return this._context
	}

	public constructor(private readonly level: ILevel, ...rules: IRule[]) {
		this.rules = rules
	}

	public create(): Game {
		const context = createRuleContext()
		const game = new Game(this.level, ...this.rules)
		game.init(context)
		this._context = context
		return game
	}
}