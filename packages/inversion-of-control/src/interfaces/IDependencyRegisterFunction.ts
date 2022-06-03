import {TDependencyName} from '../types/TDependencyContainer'
import {IResolver} from './IResolver'

export interface IDependencyRegisterFunction {
	<R extends IResolver = IResolver>(resolver: R): void
	<R extends IResolver = IResolver>(dependencyName: TDependencyName, resolver: R): void
	<R extends IResolver = IResolver>(dependencyNameOrResolver: TDependencyName | R, resolver?: R): void
}