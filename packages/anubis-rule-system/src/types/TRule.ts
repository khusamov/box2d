import {TRuleInit} from './TRuleInit'

export type TRule<P = {}> = (parameters: P) => TRuleInit