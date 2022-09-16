import {SimpleArray} from 'base-types/src'
import {Command} from './Command'

export interface ICommandInfo {
	command: Command
	/**
	 * Вероятность появления команды в геноме.
	 * Часть целого.
	 */
	probability: number
}

export class CommandProvider extends SimpleArray<ICommandInfo>{}