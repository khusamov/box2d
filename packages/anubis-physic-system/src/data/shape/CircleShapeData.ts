import {Circle} from 'planck'
import {ShapeData} from './ShapeData'

export const createCircle = (circleShapeData: CircleShapeData) => new Circle(circleShapeData.radius)

export class CircleShapeData extends ShapeData<Circle> {
	constructor(
		public readonly radius: number = 0,
		shape?: Circle
	) {
		super(shape)
	}

	public clone(shape?: Circle): CircleShapeData {
		return new CircleShapeData(this.radius, shape)
	}
}