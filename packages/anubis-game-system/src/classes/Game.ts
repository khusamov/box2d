import {IGame} from '../interfaces/IGame'
import {UpdateMessage} from '../messages/UpdateMessage'
import {ILevel, IRule, IRuleContext, TRuleInit} from 'anubis-rule-system'
import {createSuspendedRuleContext} from '../functions/createSuspendedRuleContext'

export enum GameState {
	Executed,
	Paused
}

/**
 * Главный объект игры.
 */
export class Game extends RootRule implements IGame {
	private readonly sourceRuleContext: IRuleContext
	private readonly suspendedRuleContext: IRuleContext
	private suspendContext = () => this.context[updateRuleContextSymbol](this.suspendedRuleContext)
	private resumeContext = () => this.context[updateRuleContextSymbol](this.sourceRuleContext)

	/**
	 * Конструктор игры.
	 * Игра после создания стоит на паузе.
	 * После создания игры необходимо вызывать init() для инициализации всех правил игры и затем start() для запуска игры.
	 * @param context
	 * @param level
	 * @param rules
	 */
	public constructor(private readonly context: IRuleContext, level: TRuleInit, ...rules: TRuleInit[]) {
		super(context, level, ...rules)
		this.sourceRuleContext = context
		this.suspendedRuleContext = createSuspendedRuleContext(context)
		this.pause() // Изначально игра стоит на паузе.
	}

	public start = () => this.resumeContext
	public stop = () => this.suspendContext
	public pause = this.stop
	public toggle = () => this[this.state === GameState.Paused ? 'start' : 'pause']()

	/**
	 * Отправка сообщения UpdateMessage для слушателей, которые определены правилами игры.
	 * @param timeInterval
	 */
	public update = (timeInterval: number) => this.context.messageEmitter.emit(new UpdateMessage(timeInterval))

	public override dispose() {
		super.dispose()
		this.context.messageEmitter.dispose()
	}

	private get state(): GameState {
		return (
			this.context.messageEmitter === this.sourceRuleContext.messageEmitter
				? GameState.Executed
				: GameState.Paused
		)
	}
}