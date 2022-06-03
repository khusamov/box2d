import {ILevel} from '../interfaces/ILevel'
import {IRule} from '../interfaces/IRule'

export abstract class Level implements ILevel {
	public abstract get rules(): IRule[]
}