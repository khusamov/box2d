import {TDependencyName} from '../types/TDependencyContainer'
import {IResolver} from './IResolver'

export interface IDependencyResolveFunction {
	<D, R extends IResolver<D> = IResolver<D>>(dependencyName: TDependencyName, ...parameters: Parameters<R>): D
}