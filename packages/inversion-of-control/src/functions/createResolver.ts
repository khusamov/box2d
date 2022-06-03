import {IResolver} from '../interfaces/IResolver'

/**
 * Помощник для создания функции, разрешающий зависимости.
 * Суть помощника в создании функции с именем зависимости по умолчанию (dependencyDefaultName).
 * @param dependencyDefaultName
 * @param resolver
 */
export function createResolver<D = any>(dependencyDefaultName: string, resolver: IResolver<D>): IResolver<D> {
	return Object.assign(
		resolver,
		{dependencyDefaultName}
	)
}