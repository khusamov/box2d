import {Feature, MacroRule} from 'anubis-rule-system'
import {RigidbodyCreatorRule} from '../rules/RigidbodyCreatorRule'
import {RigidbodyDeletionRule} from '../rules/RigidbodyDeletionRule'
import {FixtureCreatorRule} from '../rules/FixtureCreatorRule'
import {ShapeCreatorRule} from '../rules/ShapeCreatorRule'
import {BoxShapeData, createBox} from '../data/shape/BoxShapeData'
import {CircleShapeData, createCircle} from '../data/shape/CircleShapeData'
import {createEdge, EdgeShapeData} from '../data/shape/EdgeShapeData'
import {createPolygon, PolygonShapeData} from '../data/shape/PolygonShapeData'

export class RigidbodyFeature extends Feature {
	public constructor() {
		super(
			new RigidbodyCreatorRule,
			new RigidbodyDeletionRule,
			new FixtureCreatorRule,
			new MacroRule(
				new ShapeCreatorRule(BoxShapeData, createBox),
				new ShapeCreatorRule(CircleShapeData, createCircle),
				new ShapeCreatorRule(EdgeShapeData, createEdge),
				new ShapeCreatorRule(PolygonShapeData, createPolygon)
			)
		)
	}
}