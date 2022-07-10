import {IRuleContext} from '../interfaces/IRuleContext'

const UNDEFINED_VOID_ONLY = Symbol()
// Destructors are only allowed to return void.
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never }

export type TRuleInit = (context: IRuleContext) => void | Destructor