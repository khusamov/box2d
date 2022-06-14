import {ICommand, Timer} from 'base-types'

/**
 * @deprecated
 */
export class CommandTimer extends Timer {
	public constructor(commandQueue: ICommand[]) {
		super(
			0,
			() => commandQueue.shift()?.execute()
		)
	}
}