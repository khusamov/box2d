export interface IResolver<D = any> {
	(...params: any[]): D
	dependencyDefaultName?: string
}