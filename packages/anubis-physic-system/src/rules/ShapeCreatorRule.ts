import {MacroRule} from 'anubis-rule-system'
import {Box, Circle, Edge, Polygon} from 'planck';
import {BoxShapeData} from '../data/BoxShapeData';
import {CircleShapeData} from '../data/CircleShapeData';
import {EdgeShapeData} from '../data/EdgeShapeData';
import {PolygonShapeData} from '../data/PolygonShapeData';
import {AbstractShapeCreatorRule} from './AbstractShapeCreatorRule';

export class ShapeCreatorRule extends MacroRule {
	public constructor() {
		super(
			new AbstractShapeCreatorRule(
				BoxShapeData,
				boxShapeData => new Box(boxShapeData.width / 2, boxShapeData.height / 2)
			),
			new AbstractShapeCreatorRule(
				CircleShapeData,
				circleShapeData => new Circle(circleShapeData.radius)
			),
			new AbstractShapeCreatorRule(
				EdgeShapeData,
				edgeShapeData => new Edge(edgeShapeData.point1, edgeShapeData.point2)
			),
			new AbstractShapeCreatorRule(
				PolygonShapeData,
				polygonShapeShapeData => new Polygon(polygonShapeShapeData.vertices)
			)
		)
	}
}