import {MacroRule} from 'anubis-rule-system'
import {IRuleContext} from 'anubis-rule-system'
import {IGame} from '../interfaces/IGame'
import {UpdateMessage} from '../messages/UpdateMessage'
import {MessageEmitterController} from './MessageEmitterController'
import {NotInitializedGameError} from './NotInitializedGameError'

/**
 * Главный объект игры.
 */
export class Game extends MacroRule implements IGame {
	private _messageEmitterController: MessageEmitterController | undefined

	public start = () => this.messageEmitterController.emitOn()
	public stop = () => this.messageEmitterController.emitOff()
	public pause = () => this.stop()
	public toggle = () => this[this.started ? 'pause' : 'start']()
	public update = (timeInterval: number) => this.context.messageEmitter.emit(new UpdateMessage(timeInterval))

	public override get context(): IRuleContext {
		return super.context
	}

	private get messageEmitterController(): MessageEmitterController {
		if (!this._messageEmitterController) {
			throw new NotInitializedGameError
		}
		return this._messageEmitterController
	}

	public override init(context: IRuleContext) {
		this._messageEmitterController = new MessageEmitterController(context.messageEmitter)
		super.init(context)
	}

	public override dispose() {
		super.dispose()
		this.context.messageEmitter.dispose()
		this._messageEmitterController = undefined
	}

	public get started() {
		return this.messageEmitterController.emitEnabled
	}
}