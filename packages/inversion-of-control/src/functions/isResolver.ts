import {IResolver} from '../interfaces/IResolver'

export function isResolver(object: any): object is IResolver {
	return typeof object === 'function'
}