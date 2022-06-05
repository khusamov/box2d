import {RuleHelper} from './RuleHelper'
import {resolve} from 'inversion-of-control'
import {MessageEmitter} from '../message/MessageEmitter'
import {IMessage} from '../../interfaces/IMessage'

export class EmitterRuleHelper extends RuleHelper {
	public emit(message: IMessage) {
		resolve<MessageEmitter>('MessageEmitter').emit(message)
	}
	dispose(): void {}
}