import {ICommand, Timer} from 'base-types'
import {resolve} from 'inversion-of-control'

export class CommandTimer extends Timer {
	constructor() {
		super(
			0,
			() => resolve<ICommand[]>('CommandQueue').shift()?.execute()
		)
	}
}