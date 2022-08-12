import {IRuleContext} from '../../interfaces/IRuleContext'

export abstract class RuleHelper {
	public constructor(protected readonly context: IRuleContext) {}
}