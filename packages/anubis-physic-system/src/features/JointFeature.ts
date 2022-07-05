import {Feature} from 'anubis-rule-system'
import {MouseJointCreationRule} from '../rules/MouseJointCreationRule'
import {MouseJointDeletionRule} from '../rules/MouseJointDeletionRule'

export class JointFeature extends Feature {
	public constructor() {
		super(
			new MouseJointCreationRule,
			new MouseJointDeletionRule
		)
	}
}