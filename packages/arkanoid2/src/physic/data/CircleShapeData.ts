import {ShapeData} from './ShapeData'

export class CircleShapeData extends ShapeData {
	constructor(
		public radius: number = 0
	) {
		super()
	}
}