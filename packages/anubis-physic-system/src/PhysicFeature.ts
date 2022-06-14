import {Feature} from 'anubis-rule-system'
import {PhysicWorldCreatorRule} from './rules/PhysicWorldCreatorRule'
import {PhysicWorldUpdateRule} from './rules/PhysicWorldUpdateRule'
import {RigidbodyCreatorRule} from './rules/RigidbodyCreatorRule'
import {ShapeCreatorRule} from './rules/ShapeCreatorRule'
import {FixtureCreatorRule} from './rules/FixtureCreatorRule'
import {RigidbodyDeletionRule} from './rules/RigidbodyDeletionRule'

export class PhysicFeature extends Feature {
	public constructor() {
		super(
			new PhysicWorldCreatorRule,
			new PhysicWorldUpdateRule,
			new RigidbodyCreatorRule,
			new RigidbodyDeletionRule,
			new ShapeCreatorRule,
			new FixtureCreatorRule
		)
	}
}