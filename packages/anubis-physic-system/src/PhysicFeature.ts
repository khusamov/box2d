import {Feature, MacroRule} from 'anubis-rule-system'
import {PhysicWorldCreatorRule} from './rules/PhysicWorldCreatorRule'
import {PhysicWorldUpdateRule} from './rules/PhysicWorldUpdateRule'
import {RigidbodyCreatorRule} from './rules/RigidbodyCreatorRule'
import {FixtureCreatorRule} from './rules/FixtureCreatorRule'
import {RigidbodyDeletionRule} from './rules/RigidbodyDeletionRule'
import {PhysicWorldStartRule} from './rules/PhysicWorldStartRule'
import {IWorldDef} from './interfaces/IWorldDef'
import {ShapeCreatorRule} from './rules/ShapeCreatorRule'
import {BoxShapeData, createBox} from './data/shape/BoxShapeData'
import {CircleShapeData, createCircle} from './data/shape/CircleShapeData'
import {EdgeShapeData, createEdge} from './data/shape/EdgeShapeData'
import {PolygonShapeData, createPolygon} from './data/shape/PolygonShapeData'

interface IPhysicFeatureParameters {
	worldDef?: IWorldDef
}

export class PhysicFeature extends Feature {
	public constructor({worldDef}: IPhysicFeatureParameters = {}) {
		super(
			new PhysicWorldCreatorRule,
			new PhysicWorldStartRule(worldDef),
			new PhysicWorldUpdateRule,
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