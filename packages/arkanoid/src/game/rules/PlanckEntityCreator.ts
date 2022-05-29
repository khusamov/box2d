import {MacroRule} from '../base/MacroRule';
import {RigidbodyCreatorRule} from './RigidbodyCreatorRule';
import {ShapeCreatorRule} from './ShapeCreatorRule';
import {FixtureCreatorRule} from './FixtureCreatorRule';

export class PlanckEntityCreator extends MacroRule {
	constructor() {
		super(
			new RigidbodyCreatorRule,
			new ShapeCreatorRule,
			new FixtureCreatorRule
		)
	}
}