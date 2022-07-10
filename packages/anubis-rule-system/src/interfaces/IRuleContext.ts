import {IMessageEmitter} from 'anubis-message-broker'
import {DataStorageFasade} from 'anubis-data-storage'

export interface IRuleContext {
	messageEmitter: IMessageEmitter<IRuleContext>
	data: DataStorageFasade
}