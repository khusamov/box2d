import {SimpleArray} from 'base-types/src'
import {Command} from './Command'

export interface ICommandInfo {
	command: Command
	/**
	 * Частота появления команды в геноме.
	 */
	frequency: number
}

export class CommandProvider extends SimpleArray<ICommandInfo>{
	public get frequencyDistribution() {
		return this.map(({frequency}) => frequency)
	}
}