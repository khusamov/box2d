import {ShapeData} from './ShapeData'

export class BoxShapeData extends ShapeData {
	public constructor(
		public width: number = 0,
		public height: number = 0
	) {
		super()
	}

	public clone(): any {}
}