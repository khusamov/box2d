import {MacroRule} from '../base/MacroRule';
import {BoxShape} from '../data/BoxShape';
import {Box, Circle, Edge, Vec2} from 'planck';
import {CircleShape} from '../data/CircleShape';
import {EdgeShape} from '../data/EdgeShape';
import {AbstractShapeCreatorRule} from './AbstractShapeCreatorRule';
import {PolygonShape} from '../data/PolygonShape';
import {Polygon} from 'planck';

export class ShapeCreatorRule extends MacroRule {
	constructor() {
		super(
			new AbstractShapeCreatorRule(
				BoxShape,
				boxShapeData => new Box(boxShapeData.width / 2, boxShapeData.height / 2)
			),
			new AbstractShapeCreatorRule(
				CircleShape,
				circleShapeData => new Circle(circleShapeData.radius)
			),
			new AbstractShapeCreatorRule(
				EdgeShape,
				edgeShapeData => new Edge(new Vec2(edgeShapeData.x1, edgeShapeData.y1), new Vec2(edgeShapeData.x2, edgeShapeData.y2))
			),
			new AbstractShapeCreatorRule(
				PolygonShape,
				polygonShapeShapeData => new Polygon(polygonShapeShapeData.vertices)
			)
		)
	}
}