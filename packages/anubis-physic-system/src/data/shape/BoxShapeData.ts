import {Box} from 'planck'
import {ShapeData} from './ShapeData'

export const createBox = (boxShapeData: BoxShapeData) => new Box(boxShapeData.width / 2, boxShapeData.height / 2)

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