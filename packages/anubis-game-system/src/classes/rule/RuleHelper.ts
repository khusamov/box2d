import {IRule} from '../../interfaces/IRule'
import {IDisposable} from 'base-types'

export abstract class RuleHelper implements IDisposable {
	public constructor(protected rule: IRule) {}
	public abstract dispose(): void
}