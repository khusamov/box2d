import {ICommand, IStartable, IStoppable} from 'base-types'

/**
 * @deprecated
 */
export interface IMessageEmitCommand extends ICommand, IStartable, IStoppable {}