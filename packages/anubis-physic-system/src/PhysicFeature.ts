import {Feature} from 'anubis-rule-system'
import {PhysicWorldCreatorRule} from './rules/PhysicWorldCreatorRule'
import {PhysicWorldUpdateRule} from './rules/PhysicWorldUpdateRule'
import {RigidbodyCreatorRule} from './rules/RigidbodyCreatorRule'
import {ShapeCreatorRule} from './rules/ShapeCreatorRule'
import {FixtureCreatorRule} from './rules/FixtureCreatorRule'
import {RigidbodyDeletionRule} from './rules/RigidbodyDeletionRule'
import {PhysicWorldStartRule} from './rules/PhysicWorldStartRule'
import {IWorldDef} from './interfaces/IWorldDef'

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
			new ShapeCreatorRule,
			new FixtureCreatorRule
		)
	}
}