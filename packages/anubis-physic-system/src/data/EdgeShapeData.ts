import {Vec2, Edge} from 'planck'
import {ShapeData} from './ShapeData'

export const createEdge = (edgeShapeData: EdgeShapeData) => new Edge(edgeShapeData.point1.clone(), edgeShapeData.point2.clone())

export class EdgeShapeData extends ShapeData<Edge> {
	constructor(
		public readonly point1: Vec2 = new Vec2(0, 0),
		public readonly point2: Vec2 = new Vec2(0, 0),
		shape?: Edge
	) {
		super(shape)
	}

	public clone(shape?: Edge): EdgeShapeData {
		return new EdgeShapeData(
			this.point1.clone(),
			this.point2.clone(),
			shape
		)
	}
}