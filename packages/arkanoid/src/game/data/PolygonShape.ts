import {Shape} from './Shape';
import {Vec2} from 'planck';

export class PolygonShape extends Shape {
	public vertices: Vec2[]

	constructor(...vertices: Vec2[]) {
		super()
		this.vertices = vertices
	}

	clone() {
		return new PolygonShape(...this.vertices)
	}
}