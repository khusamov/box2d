import {IMessageEmitter} from 'anubis-message-broker'

const dummyFunction = () => {}

export class MessageEmitterController {
	private readonly emitDummy = dummyFunction
	private readonly emitSource

	public constructor(public readonly messageEmitter: IMessageEmitter) {
		this.emitSource = messageEmitter.emit
	}

	public emitOff() {
		this.messageEmitter.emit = this.emitDummy
	}

	public emitOn() {
		this.messageEmitter.emit = this.emitSource
	}

	public get emitEnabled() {
		return this.messageEmitter.emit === this.emitSource
	}
}