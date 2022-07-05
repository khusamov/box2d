import {Feature, MacroRule} from 'anubis-rule-system'
import {RigidbodyCreationRule} from '../rules/RigidbodyCreationRule'
import {RigidbodyDeletionRule} from '../rules/RigidbodyDeletionRule'
import {FixtureCreationRule} from '../rules/FixtureCreationRule'
import {ShapeCreationRule} from '../rules/ShapeCreationRule'
import {BoxShapeData, createBox} from '../data/shape/BoxShapeData'
import {CircleShapeData, createCircle} from '../data/shape/CircleShapeData'
import {createEdge, EdgeShapeData} from '../data/shape/EdgeShapeData'
import {createPolygon, PolygonShapeData} from '../data/shape/PolygonShapeData'

export class RigidbodyFeature extends Feature {
	public constructor() {
		super(
			new RigidbodyCreationRule,
			new RigidbodyDeletionRule,
			new FixtureCreationRule,
			new MacroRule(
				new ShapeCreationRule(BoxShapeData, createBox),
				new ShapeCreationRule(CircleShapeData, createCircle),
				new ShapeCreationRule(EdgeShapeData, createEdge),
				new ShapeCreationRule(PolygonShapeData, createPolygon)
			)
		)
	}
}