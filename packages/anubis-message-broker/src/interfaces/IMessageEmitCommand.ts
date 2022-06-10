import {ICommand, IStartable, IStoppable} from 'base-types'

export interface IMessageEmitCommand extends ICommand, IStartable, IStoppable {}