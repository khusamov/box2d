import {ICommand, ICreator} from 'base-types'
import {IMessageBroker} from '../interfaces/IMessageBroker'
import {IMessage} from '../interfaces/IMessage'
import {IMessageEmitter} from '../interfaces/IMessageEmitter'
import {IMessageEmitCommand} from '../interfaces/IMessageEmitCommand'
import {MessageEmitter} from './MessageEmitter'
import {EventEmitter} from 'events'
import {MessageEmitCommand} from './MessageEmitCommand'
import {MessageBroker} from './MessageBroker'

export interface IMessageBrokerParameters {
	commandQueue?: ICommand[]
	messageQueue?: IMessage[]
	messageEmitter?: IMessageEmitter
	messageEmitCommand?: IMessageEmitCommand
}

export class MessageBrokerCreator implements ICreator<IMessageBroker> {
	private readonly commandQueue: ICommand[]
	private readonly messageQueue: IMessage[]
	private readonly messageEmitter: IMessageEmitter
	private readonly messageEmitCommand: IMessageEmitCommand

	public constructor()
	public constructor(commandQueue: ICommand[])
	public constructor(parameters: IMessageBrokerParameters)
	public constructor(commandQueueOrParameters: ICommand[] | IMessageBrokerParameters = {}) {
		const parameters: IMessageBrokerParameters = (
			Array.isArray(commandQueueOrParameters)
				? {commandQueue: commandQueueOrParameters}
				: commandQueueOrParameters
		)
		this.commandQueue = parameters.commandQueue ? parameters.commandQueue : []
		this.messageQueue = parameters.messageQueue ? parameters.messageQueue : []
		this.messageEmitter = (
			parameters.messageEmitter
				? parameters.messageEmitter
				: new MessageEmitter(new EventEmitter)
		)
		this.messageEmitCommand = (
			parameters.messageEmitCommand
				? parameters.messageEmitCommand
				: new MessageEmitCommand(this.messageEmitter, this.messageQueue, this.commandQueue)
		)
	}

	public create(): IMessageBroker {
		return new MessageBroker(
			this.commandQueue,
			this.messageQueue,
			this.messageEmitter,
			this.messageEmitCommand
		)
	}
}