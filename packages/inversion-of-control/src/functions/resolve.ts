import {IDependencyResolveFunction} from '../interfaces/IDependencyResolveFunction'
import {DependencyContainer} from '../classes/DependencyContainer'
import {DependencyNotFoundError} from '../errors/DependencyNotFoundError'

export const resolve: IDependencyResolveFunction = (dependencyName, ...parameters) => {
	const resolver = DependencyContainer.dependencyContainer.get(dependencyName)

	if (!resolver) {
		throw new DependencyNotFoundError(dependencyName)
	}

	return resolver(...parameters)
}