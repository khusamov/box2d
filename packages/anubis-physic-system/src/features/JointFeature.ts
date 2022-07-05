import {Feature} from 'anubis-rule-system'
import {MouseJointCreatorRule} from '../rules/MouseJointCreatorRule'
import {MouseJointDeletionRule} from '../rules/MouseJointDeletionRule'

export class JointFeature extends Feature {
	public constructor() {
		super(
			new MouseJointCreatorRule,
			new MouseJointDeletionRule
		)
	}
}