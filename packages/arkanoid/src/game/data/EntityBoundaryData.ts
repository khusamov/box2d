import {Data} from 'anubis-data-storage'

export type THasPointInsideFunction = (position: {x: number, y: number}) => boolean

/**
 * Данные, которые позволяют получить информацию о границах сущности.
 */
export class EntityBoundaryData extends Data {
	public constructor(public hasPointInside: THasPointInsideFunction) {
		super()
	}
}