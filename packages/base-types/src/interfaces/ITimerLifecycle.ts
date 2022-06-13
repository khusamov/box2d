import {IStartable} from './IStartable'
import {IStoppable} from './IStoppable'

export interface ITimerLifecycle extends IStartable, IStoppable {
	toggle(): void
	pause(): void
}