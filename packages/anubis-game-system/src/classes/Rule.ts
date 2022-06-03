import {IRule} from '../interfaces/IRule'

export abstract class Rule implements IRule {
	public abstract execute(): void
}