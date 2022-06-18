import {ShapeData} from './ShapeData'
import {Vec2, Polygon} from 'planck'

export class PolygonShapeData extends ShapeData<Polygon> {
	public readonly vertices: Readonly<Vec2[]>

	public constructor(
		shape?: Polygon,
		...vertices: Readonly<Vec2[]>
	) {
		super(shape)
		this.vertices = vertices
	}

	public clone(shape?: Polygon): PolygonShapeData {
		return new PolygonShapeData(
			shape,
			...this.vertices.map(vertex => vertex.clone())
		)
	}
}