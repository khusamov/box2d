import {Box} from 'planck'
import {ShapeData} from './ShapeData'

export class BoxShapeData extends ShapeData<Box> {
	public constructor(
		public readonly width: number = 0,
		public readonly height: number = 0,
		shape?: Box
	) {
		super(shape)
	}

	public clone(shape?: Box): BoxShapeData {
		return new BoxShapeData(
			this.width,
			this.height,
			shape
		)
	}
}