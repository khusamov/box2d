import {IRuleContext} from 'anubis-rule-system'
import {suspendMessageEmitterEmit} from '../const/suspendMessageEmitterEmit'

export function createSuspendedRuleContext(ruleContext: IRuleContext): IRuleContext {
	return {
		dataStorage: ruleContext.dataStorage,
		messageEmitter: new Proxy(ruleContext.messageEmitter, suspendMessageEmitterEmit)
	}
}

