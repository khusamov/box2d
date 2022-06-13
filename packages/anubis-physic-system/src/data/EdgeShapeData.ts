import {Vec2} from 'planck'
import {ShapeData} from './ShapeData'

export class EdgeShapeData extends ShapeData {
	constructor(
		public point1: Vec2 = new Vec2(0, 0),
		public point2: Vec2 = new Vec2(0, 0)
	) {
		super()
	}

	public clone(): EdgeShapeData {
		return new EdgeShapeData(
			this.point1.clone(),
			this.point2.clone()
		)
	}
}