import {TDependencyName} from 'inversion-of-control'

export type TResolvedDependencyMap = Map<TDependencyName, any>

/**
 * Глобальные зависимости.
 */
export class GlobalMap {
	private resolvedDependencyMap: TResolvedDependencyMap = new Map
	public get<D = any>(dependencyName: TDependencyName, creator: () => D): D {
		if (!this.resolvedDependencyMap.has(dependencyName)) {
			this.resolvedDependencyMap.set(dependencyName, creator())
		}
		return this.resolvedDependencyMap.get(dependencyName)
	}
}