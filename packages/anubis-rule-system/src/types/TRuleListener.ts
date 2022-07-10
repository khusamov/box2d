import {IMessage, TMessageListener} from 'anubis-message-broker'
import {IRuleContext} from '../interfaces/IRuleContext'

export type TRuleListener<M extends IMessage> = TMessageListener<M, IRuleContext>