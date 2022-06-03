import {IDependencyRegisterFunction} from '../interfaces/IDependencyRegisterFunction'
import {DependencyContainer} from '../classes/DependencyContainer'
import {RepeatedRegisteringDependencyError} from '../errors/RepeatedRegisteringDependencyError'
import {IResolver} from '../interfaces/IResolver'
import {TDependencyName} from '../types/TDependencyContainer'
import {isResolver} from './isResolver'

export const register: IDependencyRegisterFunction = (
	<R extends IResolver = IResolver>(dependencyNameOrResolver: TDependencyName | R, resolver?: R) => {
		let dependencyName: string | undefined
		if (isResolver(dependencyNameOrResolver)) {
			dependencyName = dependencyNameOrResolver.dependencyDefaultName
			resolver = dependencyNameOrResolver
		} else {
			dependencyName = dependencyNameOrResolver
		}

		if (!dependencyName) {
			throw new Error('Не задано имя зависимости')
		}

		if (!resolver) {
			throw new Error(`Для ${dependencyName} не задана функция разрешения зависимости`)
		}

		if (DependencyContainer.dependencyContainer.has(dependencyName)) {
			throw new RepeatedRegisteringDependencyError(dependencyName)
		}

		DependencyContainer.dependencyContainer.set(dependencyName, resolver)
	}
)