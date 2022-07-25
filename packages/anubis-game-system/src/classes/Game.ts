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
	public update = (timeInterval: number) => this.messageEmitterController.messageEmitter.emit(new UpdateMessage(timeInterval))

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
		this.messageEmitterController.messageEmitter.dispose()
		this._messageEmitterController = undefined
	}

	private get started() {
		return this.messageEmitterController.emitEnabled
	}
}