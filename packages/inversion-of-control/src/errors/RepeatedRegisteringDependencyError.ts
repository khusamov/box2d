import {TDependencyName} from '../types/TDependencyContainer'

export class RepeatedRegisteringDependencyError extends Error {
	public constructor(dependencyName: TDependencyName) {
		super(`Зависимость '${dependencyName}' уже зарегистрирована`);
	}
}