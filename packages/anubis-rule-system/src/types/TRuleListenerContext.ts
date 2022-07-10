import {TMessageListenerContext} from 'anubis-message-broker'
import {IRuleContext} from '../interfaces/IRuleContext'

export type TRuleListenerContext = TMessageListenerContext<IRuleContext>