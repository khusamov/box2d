import {TDependencyName} from '../types/TDependencyContainer'

export class DependencyNotFoundError extends Error {
	public constructor(dependencyName: TDependencyName) {
		super(`Не найдена зависимость '${dependencyName}'`);
	}
}