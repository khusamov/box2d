import {ShapeData} from './ShapeData'
import {Vec2} from 'planck'

export class PolygonShapeData extends ShapeData {
	public vertices: Vec2[]

	public constructor(...vertices: Vec2[]) {
		super()
		this.vertices = vertices
	}

	public clone(): any {}
}